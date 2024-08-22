import { memberSchema } from '@nexus/auth'
import { FastifyReply, FastifyRequest } from 'fastify'

import { addMembersBodySchema } from '@/schema-validation/organization/organization-schema'
import { MemberAlreadyExistError } from '@/use-cases/errors/member-already-exist-error'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { MakeAddMemberUseCase } from '@/use-cases/factories/members-factory-function/make-add-member-factory'
import { MakeGetMemberUseCase } from '@/use-cases/factories/members-factory-function/make-get-member-factory'
import { MakeGetOrganizationUseCase } from '@/use-cases/factories/organization-factory-function/make-get-organization-factory'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function addMemberShipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug, role, statusProfile, userId } = addMembersBodySchema.parse(
    request.body,
  )

  try {
    const addMembershipOrganizationUseCase = MakeAddMemberUseCase()
    const getOrganization = MakeGetOrganizationUseCase()
    const getMemberOrganization = MakeGetMemberUseCase()
    const getProfile = MakeGetProfileUserUseCase()

    const { user } = await getProfile.execute({
      userId: request.user.sub,
    })

    if (!user) {
      throw new Error('Unauthorized')
    }

    const { organization } = await getOrganization.execute({
      slug,
    })

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const { member } = await getMemberOrganization.execute({
      slug,
      userId: user.id,
    })

    const memberAuth = memberSchema.parse({
      id: member.id,
      ownerId: user.id,
    })

    const ability = getUserPermissions(userId, member.role)

    if (ability.cannot('create', memberAuth)) {
      return reply.status(403).send({
        message:
          'You do not have permission to add a member to this organization.',
      })
    }

    await addMembershipOrganizationUseCase.execute({
      organizationId: organization.id,
      userId,
      role,
      statusProfile,
      slug,
    })
    return reply.status(201).send({ message: 'Membership added sucess' })
  } catch (err) {
    if (err) {
      if (err instanceof MemberAlreadyExistError) {
        reply.status(409).send({ message: err.message })
      }
      throw err
    }
    throw err
  }
}
