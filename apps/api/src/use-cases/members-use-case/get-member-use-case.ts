import { Member } from '@prisma/client'

import { MembersInterface } from '@/repositories/Prisma/members/members-interface'

import { MemberNotExistError } from '../errors/member-not-exist-error'

interface GetMemberUseCaseRequest {
  slug: string
  userId: string
}

interface GetMemberUseCaseResponse {
  member: Member
}

export class GetMemberUseCase {
  constructor(private membersRepository: MembersInterface) {}

  async execute({
    slug,
    userId,
  }: GetMemberUseCaseRequest): Promise<GetMemberUseCaseResponse> {
    const member = await this.membersRepository.findMemberByUserId(userId, slug)

    if (!member) {
      throw new MemberNotExistError()
    }

    return { member }
  }
}
