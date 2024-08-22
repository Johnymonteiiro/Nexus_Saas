import {
  MemberDetails,
  MembersInterface,
} from '@/repositories/Prisma/members/members-interface'
import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface GetMembersUseCaseRequest {
  slug: string
  page: number
}

interface GetMembersUseCaseResponse {
  members: MemberDetails[]
}

export class GetMembersUseCase {
  constructor(
    private membersRepository: MembersInterface,
    private organizationRepository: OrganizationInterface,
  ) {}

  async execute({
    slug,
    page,
  }: GetMembersUseCaseRequest): Promise<GetMembersUseCaseResponse> {
    const organizationNotFound =
      await this.organizationRepository.findBySlug(slug)

    if (!organizationNotFound) {
      throw new OrganizationNotFoundError()
    }

    const members = await this.membersRepository.findMany(slug, page)

    if (!members) {
      throw new OrganizationNotFoundError()
    }

    return { members }
  }
}
