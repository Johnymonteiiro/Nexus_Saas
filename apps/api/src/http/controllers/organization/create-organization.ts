import { FastifyReply, FastifyRequest } from 'fastify'

import { createOrganizationBodySchema } from '@/schema-validation/organization/organization-schema'
import { OrganizationAlreadyExistError } from '@/use-cases/errors/organization-already-exist-error'
import { MakeCreateOrganizationUseCase } from '@/use-cases/factories/organization-factory-function/make-create-organization-factory'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { domain, name, shouldAttachUsersByDomain, userId } =
    createOrganizationBodySchema.parse(request.body)
  try {
    const organizationUseCase = MakeCreateOrganizationUseCase()
    await organizationUseCase.execute({
      name,
      domain,
      userId,
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
