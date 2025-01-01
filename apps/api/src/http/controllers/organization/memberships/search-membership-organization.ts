import { FastifyReply, FastifyRequest } from 'fastify'

import { searchMembershipOrganizationParamsSchema } from '@/schema-validation/organization/organization-schema'
import { MemberNotExistError } from '@/use-cases/errors/member-not-exist-error'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { MakeSearchMemberUseCase } from '@/use-cases/factories/members-factory-function/make-search-member-factory'

export async function SearchMembershipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug, query } = searchMembershipOrganizationParamsSchema.parse(
    request.params,
  )

  try {
    const getMembersUseCase = MakeSearchMemberUseCase()

    const { members: membersLists } = await getMembersUseCase.execute({
      query,
      slug,
    })

    if (membersLists.length <= 0) {
      return reply.status(409).send({ message: 'User not found' })
    }

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
    } else {
      if (err instanceof MemberNotExistError) {
        reply.status(409).send({ message: err.message })
      }
    }
    throw err
  }
}
