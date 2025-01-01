import {
  GetAllOrganizationDetails,
  OrganizationInterface,
} from '@/repositories/Prisma/organizations/organization-interface'

interface GetAllOrganizationUseCaseRequest {
  page: number
}

interface GetAllOrganizationUseCaseResponse {
  organization: GetAllOrganizationDetails[]
}

export class GetAllOrganizationUseCase {
  constructor(private organizationRepository: OrganizationInterface) {}

  async execute({
    page,
  }: GetAllOrganizationUseCaseRequest): Promise<GetAllOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findMany(page)

    if (organization.length === 0) {
      throw new Error(`There's no organizations`)
    }

    return { organization }
  }
}
