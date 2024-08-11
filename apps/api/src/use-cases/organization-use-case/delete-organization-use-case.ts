import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface DeleteOrganizationUseCaseRequest {
  organizationId: string
  domain: string
}

interface DeleteOrganizationUseCaseResponse {
  organization: Organization | null
}

export class DeleteOrganizationUseCase {
  constructor(private userRepository: OrganizationInterface) {}

  async execute({
    organizationId,
    domain,
  }: DeleteOrganizationUseCaseRequest): Promise<DeleteOrganizationUseCaseResponse> {
    if (domain) {
      const organizationExist = await this.userRepository.findByDomain(domain)

      if (!organizationExist) {
        throw new OrganizationNotFoundError()
      }
    }

    const organization =
      await this.userRepository.deleteOrganization(organizationId)

    return { organization }
  }
}
