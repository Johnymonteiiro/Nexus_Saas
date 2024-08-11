import { FastifyReply, FastifyRequest } from 'fastify'

import { membershipOrganizationParamsSchema } from '@/schema-validation/organization/organization-schema'
import { OrganizationAlreadyExistError } from '@/use-cases/errors/organization-already-exist-error'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'

export async function GetMembershipOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug } = membershipOrganizationParamsSchema.parse(request.params)
  try {
    const getProfile = MakeGetProfileUserUseCase()
    const { user } = await getProfile.execute({
      userId: request.user.sub,
    })

    return reply.status(201).send({ slug, user })
  } catch (err) {
    if (err) {
      if (err instanceof OrganizationAlreadyExistError) {
        reply.status(409).send({ message: err.message })
      }
      throw err
    }
    throw err
  }
}
