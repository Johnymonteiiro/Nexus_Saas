import {
  DeleteOrganizationArchived,
  OrganizationInterface,
} from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface DeleteOrganizationUseCaseRequest {
  organizationId: string
  domain: string
}

interface DeleteOrganizationUseCaseResponse {
  organization: DeleteOrganizationArchived | null
}

export class DeleteOrganizationUseCase {
  constructor(private userRepository: OrganizationInterface) {}

  async execute({
    organizationId,
    domain,
  }: DeleteOrganizationUseCaseRequest): Promise<DeleteOrganizationUseCaseResponse> {
    const organizationExist = await this.userRepository.findByDomain(domain)

    if (!organizationExist) {
      throw new OrganizationNotFoundError()
    }

    if (organizationExist.status === 'ACTIVE') {
      throw new Error('This organization is not Archived')
    }

    const organization =
      await this.userRepository.deleteOrganization(organizationId)

    return { organization }
  }
}
