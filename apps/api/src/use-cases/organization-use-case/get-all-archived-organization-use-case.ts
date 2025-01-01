import {
  GetAllOrganizationArchivedDetails,
  OrganizationInterface,
} from '@/repositories/Prisma/organizations/organization-interface'

interface GetAllArchivedOrganizationUseCaseRequest {
  page: number
}

interface GetAllArchivedOrganizationUseCaseResponse {
  organization: GetAllOrganizationArchivedDetails[]
}

export class GetAllArchivedOrganizationUseCase {
  constructor(private organizationRepository: OrganizationInterface) {}

  async execute({
    page,
  }: GetAllArchivedOrganizationUseCaseRequest): Promise<GetAllArchivedOrganizationUseCaseResponse> {
    const organization =
      await this.organizationRepository.findManyArchived(page)

    if (organization.length === 0) {
      throw new Error(`There's no archived organizations`)
    }

    return { organization }
  }
}
