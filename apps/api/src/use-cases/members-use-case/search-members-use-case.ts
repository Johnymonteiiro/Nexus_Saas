import {
  MemberDetails,
  MembersInterface,
} from '@/repositories/Prisma/members/members-interface'
import { OrganizationInterface } from '@/repositories/Prisma/organizations/organization-interface'

import { MemberNotExistError } from '../errors/member-not-exist-error'
import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface SearchMembersUseCaseRequest {
  slug: string
  query: string
}

interface SearchMembersUseCaseResponse {
  members: MemberDetails[]
}

export class SearchMembersUseCase {
  constructor(
    private membersRepository: MembersInterface,
    private organizationRepository: OrganizationInterface,
  ) {}

  async execute({
    slug,
    query,
  }: SearchMembersUseCaseRequest): Promise<SearchMembersUseCaseResponse> {
    const organizationNotFound =
      await this.organizationRepository.findBySlug(slug)

    if (!organizationNotFound) {
      throw new OrganizationNotFoundError()
    }

    const members = await this.membersRepository.searchMember(query, slug)

    if (!members) {
      throw new MemberNotExistError()
    }

    return {
      members,
    }
  }
}
