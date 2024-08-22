import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'
import { createSlug } from '@/tools/create-slug'

interface UpdateOrganizationUseCaseRequest {
  organizationId: string
  name?: string
  shouldAttachUsersByDomain?: boolean
  description?: string
  imageUrl?: string
  domain?: string
}

interface UpdateOrganizationUseCaseResponse {
  organization: Organization
}

export class UpdateOrganizationUseCase {
  constructor(private userRepository: OrganizationInterface) {}

  async execute({
    organizationId,
    name,
    domain,
    shouldAttachUsersByDomain,
    description,
    imageUrl,
  }: UpdateOrganizationUseCaseRequest): Promise<UpdateOrganizationUseCaseResponse> {
    const slug = name ? createSlug(name) : undefined // Remover depois o slug

    const data = {
      name,
      slug,
      domain,
      shouldAttachUsersByDomain,
      description,
      imageUrl,
    }

    const organization = await this.userRepository.updateOrganization(
      data,
      organizationId,
    )

    return {
      organization,
    }
  }
}
