import { FastifyReply, FastifyRequest } from 'fastify'

import { getMembershipOrganizationParamsSchema } from '@/schema-validation/organization/organization-schema'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { MakeGetMembersUseCase } from '@/use-cases/factories/members-factory-function/make-get-members-factory'

export async function GetMembershipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug, page } = getMembershipOrganizationParamsSchema.parse(
    request.params,
  )

  try {
    const getMembersUseCase = MakeGetMembersUseCase()

    const { members: membersLists } = await getMembersUseCase.execute({
      page,
      slug,
    })

    const members = membersLists.map((member) => {
      return {
        userId: member.userId,
        memberId: member.id,
        name: member.user.name,
        profession: member.user.profession,
        position: member.user.position,
        avatar: member.user.imageUrl,
        role: member.role,
        status: member.status_profile,
        org_name: member.Organization.name,
      }
    })

    return reply.status(201).send(members)
  } catch (err) {
    if (err) {
      if (err instanceof OrganizationNotFoundError) {
        reply.status(409).send({ message: err.message })
      }
      throw err
    }
    throw err
  }
}
