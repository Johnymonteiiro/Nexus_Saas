import { memberSchema } from '@nexus/auth'
import { FastifyReply, FastifyRequest } from 'fastify'

import { deleteMembershipOrganizationParamsSchema } from '@/schema-validation/organization/organization-schema'
import { MemberNotExistError } from '@/use-cases/errors/member-not-exist-error'
import { MakeDeleteMemberUseCase } from '@/use-cases/factories/members-factory-function/make-delete-member-factory'
import { MakeGetMemberUseCase } from '@/use-cases/factories/members-factory-function/make-get-member-factory'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function DeleteMembershipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug, memberId } = deleteMembershipOrganizationParamsSchema.parse(
    request.params,
  )

  try {
    const deleteMemberUseCase = MakeDeleteMemberUseCase()
    const getProfile = MakeGetProfileUserUseCase()
    const getMemberOrganization = MakeGetMemberUseCase()

    const { user } = await getProfile.execute({
      userId: request.user.sub,
    })

    if (!user) {
      throw new Error('Unauthorized')
    }

    const { member } = await getMemberOrganization.execute({
      slug,
      userId: user.id,
    })

    const memberAuth = memberSchema.parse({
      id: memberId,
      ownerId: user.id,
    })

    const ability = getUserPermissions(user.id, member.role)

    if (ability.cannot('delete', memberAuth)) {
      return reply.status(403).send({
        message:
          'You do not have permission to delete this member from the organization.',
      })
    }

    await deleteMemberUseCase.execute({
      slug,
      memberId,
    })

    return reply.status(201).send({ message: 'success' })
  } catch (err) {
    if (err instanceof MemberNotExistError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'An unexpected error occurred' })
  }
}

// const organizationAuth = organizationSchema.parse(organization)

// const { cannot } = defineAbilityfor(userAuth)

// if (cannot('delete', organizationAuth)) {
//   throw new Error('You do not have permission to delete this organization')
// }
