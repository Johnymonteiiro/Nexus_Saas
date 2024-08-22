import { Member } from '@prisma/client'

import { MembersInterface } from '@/repositories/Prisma/members/members-interface'

import { MemberNotExistError } from '../errors/member-not-exist-error'

interface DeleteMembersUseCaseRequest {
  slug: string
  memberId: string
}

interface DeleteMembersUseCaseResponse {
  member: Member | null
}

export class DeleteMembersUseCase {
  constructor(private membersRepository: MembersInterface) {}

  async execute({
    memberId,
    slug,
  }: DeleteMembersUseCaseRequest): Promise<DeleteMembersUseCaseResponse> {
    const memberAlreadyExist = await this.membersRepository.findByMemberId(
      memberId,
      slug,
    )

    if (!memberAlreadyExist) {
      throw new MemberNotExistError()
    }

    const member = await this.membersRepository.deleteMemberOnOrganization(
      memberId,
      slug,
    )

    return { member }
  }
}
