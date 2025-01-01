import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface SearchOrganizationUseCaseRequest {
  query: string
}

interface SearchOrganizationUseCaseResponse {
  organization: Organization[]
}

export class SearchOrganizationUseCase {
  constructor(private organizationRepository: OrganizationInterface) {}

  async execute({
    query,
  }: SearchOrganizationUseCaseRequest): Promise<SearchOrganizationUseCaseResponse> {
    const organization =
      await this.organizationRepository.searchOrganization(query)

    if (organization.length === 0) {
      throw new OrganizationNotFoundError()
    }

    return { organization }
  }
}
