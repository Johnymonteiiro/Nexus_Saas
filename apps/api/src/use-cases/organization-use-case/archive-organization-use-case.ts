import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface ArchiveOrganizationUseCaseRequest {
  organizationId: string
  domain: string
}

interface ArchiveOrganizationUseCaseResponse {
  organization: Organization | null
}

export class ArchiveOrganizationUseCase {
  constructor(private userRepository: OrganizationInterface) {}

  async execute({
    organizationId,
    domain,
  }: ArchiveOrganizationUseCaseRequest): Promise<ArchiveOrganizationUseCaseResponse> {
    if (domain) {
      const organizationExist = await this.userRepository.findByDomain(domain)

      if (!organizationExist) {
        throw new OrganizationNotFoundError()
      }
    }

    const organization =
      await this.userRepository.archiveOrganizationById(organizationId)

    return { organization }
  }
}
