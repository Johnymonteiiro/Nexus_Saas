import { memberSchema } from '@nexus/auth'
import { FastifyReply, FastifyRequest } from 'fastify'

import { addMembersBodySchema } from '@/schema-validation/organization/organization-schema'
import { MemberAlreadyExistError } from '@/use-cases/errors/member-already-exist-error'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { MakeGetMemberUseCase } from '@/use-cases/factories/members-factory-function/make-get-member-factory'
import { MakeUpdateMemberUseCase } from '@/use-cases/factories/members-factory-function/make-update-member-factory'
import { MakeGetOrganizationUseCase } from '@/use-cases/factories/organization-factory-function/make-get-organization-factory'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function updateMemberShipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug, role, statusProfile, userId } = addMembersBodySchema.parse(
    request.body,
  )

  try {
    const updateMembershipOrganizationUseCase = MakeUpdateMemberUseCase()
    const getOrganization = MakeGetOrganizationUseCase()
    const getMemberOrganization = MakeGetMemberUseCase()
    const { organization } = await getOrganization.execute({
      slug,
    })

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const { member } = await getMemberOrganization.execute({
      slug,
      userId,
    })

    const memberAuth = memberSchema.parse({
      id: member.id,
      ownerId: userId,
    })

    const ability = getUserPermissions(userId, member.role)

    if (ability.cannot('update', memberAuth)) {
      return reply.status(403).send({
        message:
          'You do not have permission to update this member from the organization.',
      })
    }

    await updateMembershipOrganizationUseCase.execute({
      organizationId: organization.id,
      userId,
      role,
      statusProfile,
      slug,
      memberId: member.id,
    })

    return reply.status(201).send({ message: 'Membership update sucess' })
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
