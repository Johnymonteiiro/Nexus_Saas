import { FastifyReply, FastifyRequest } from 'fastify'

import { createOrganizationBodySchema } from '@/schema-validation/organization/organization-schema'
import { OrganizationAlreadyExistError } from '@/use-cases/errors/organization-already-exist-error'
import { MakeCreateOrganizationUseCase } from '@/use-cases/factories/organization-factory-function/make-create-organization-factory'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { domain, name, shouldAttachUsersByDomain } =
    createOrganizationBodySchema.parse(request.body)
  try {
    const organizationUseCase = MakeCreateOrganizationUseCase()
    const getProfile = MakeGetProfileUserUseCase()

    const { user } = await getProfile.execute({
      userId: request.user.sub,
    })

    if (!user) {
      throw new Error('Unauthorized')
    }

    const ability = getUserPermissions(user.id, user.globalRole)

    if (ability.cannot('create', 'Organization')) {
      return reply.status(403).send({
        message: 'You do not have permission to create an organization',
      })
    }
    await organizationUseCase.execute({
      name,
      domain,
      userId: user.id,
      shouldAttachUsersByDomain,
    })
    return reply.status(201).send()
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
