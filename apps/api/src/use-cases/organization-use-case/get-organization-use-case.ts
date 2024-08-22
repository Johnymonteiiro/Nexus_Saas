import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface GetOrganizationUseCaseRequest {
  slug: string
}

interface GetOrganizationUseCaseResponse {
  organization: Organization | null
}

export class GetOrganizationUseCase {
  constructor(private organizationRepository: OrganizationInterface) {}

  async execute({
    slug,
  }: GetOrganizationUseCaseRequest): Promise<GetOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findBySlug(slug)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    return { organization }
  }
}
