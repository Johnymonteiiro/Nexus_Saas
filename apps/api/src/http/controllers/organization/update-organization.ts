import { organizationSchema } from '@nexus/auth'
import { FastifyReply, FastifyRequest } from 'fastify'

import {
  UpdateOrganizationBodySchema,
  UpdateOrganizationParamSchema,
} from '@/schema-validation/organization/organization-schema'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { MakeGetMemberUseCase } from '@/use-cases/factories/members-factory-function/make-get-member-factory'
import { MakeUpdateOrganizationUseCase } from '@/use-cases/factories/organization-factory-function/make-update-organization-factory copy'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function UpdateOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    domain,
    name,
    shouldAttachUsersByDomain,
    organizationId,
    description,
    imageUrl,
  } = UpdateOrganizationBodySchema.parse(request.body)

  const { slug } = UpdateOrganizationParamSchema.parse(request.params)

  try {
    const updateOrganizationUseCase = MakeUpdateOrganizationUseCase()
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

    const userRole = user.globalRole || member.role

    const ability = getUserPermissions(user.id, userRole)

    const organizationAuth = organizationSchema.parse({
      id: organizationId,
      ownerId: user.id,
    })

    if (ability.cannot('update', organizationAuth)) {
      return reply.status(403).send({
        message: 'You do not have permission to update this organization',
      })
    }
    await updateOrganizationUseCase.execute({
      organizationId,
      description,
      name,
      domain,
      imageUrl,
      shouldAttachUsersByDomain,
    })
    return reply.status(201).send()
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
