import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface SearchArchivedOrganizationUseCaseRequest {
  query: string
}

interface SearchArchivedOrganizationUseCaseResponse {
  organization: Organization[]
}

export class SearchArchivedOrganizationUseCase {
  constructor(private organizationRepository: OrganizationInterface) {}

  async execute({
    query,
  }: SearchArchivedOrganizationUseCaseRequest): Promise<SearchArchivedOrganizationUseCaseResponse> {
    const organization =
      await this.organizationRepository.searchArchivedOrganization(query)

    if (organization.length === 0) {
      throw new OrganizationNotFoundError()
    }

    return { organization }
  }
}
