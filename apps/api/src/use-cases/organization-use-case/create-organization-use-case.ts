import { Organization } from '@prisma/client'

import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'
import { createSlug } from '@/tools/create-slug'

import { OrganizationAlreadyExistError } from '../errors/organization-already-exist-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  userId: string
  shouldAttachUsersByDomain?: boolean
  domain?: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private userRepository: OrganizationInterface) {}

  async execute({
    name,
    domain,
    shouldAttachUsersByDomain,
    userId,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    if (domain) {
      const organizationWithSameDomain =
        await this.userRepository.findByDomain(domain)

      if (organizationWithSameDomain) {
        throw new OrganizationAlreadyExistError()
      }
    }

    const slug = createSlug(name)

    const organization = await this.userRepository.create({
      name,
      slug,
      domain,
      shouldAttachUsersByDomain,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: 'ADMIN',
        },
      },
    })

    return {
      organization,
    }
  }
}
