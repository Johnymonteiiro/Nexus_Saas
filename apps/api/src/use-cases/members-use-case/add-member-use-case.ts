import { Member, Role, StatusProfile } from '@prisma/client'

import { MembersInterface } from '@/repositories/Prisma/members/members-interface'

import { MemberAlreadyExistError } from '../errors/member-already-exist-error'

interface AddMemberUseCaseRequest {
  userId: string
  organizationId: string
  role: Role
  statusProfile: StatusProfile
  slug: string
}

interface AddMemberUseCaseResponse {
  member: Member
}

export class AddMemberUseCase {
  constructor(private membersRepository: MembersInterface) {}

  async execute({
    userId,
    role,
    organizationId,
    statusProfile,
    slug,
  }: AddMemberUseCaseRequest): Promise<AddMemberUseCaseResponse> {
    const memberAlreadyExist = await this.membersRepository.findMemberByUserId(
      userId,
      slug,
    )

    if (memberAlreadyExist) {
      throw new MemberAlreadyExistError()
    }

    const member = await this.membersRepository.addMembers({
      userId,
      organizationId,
      role,
      status_profile: statusProfile,
    })

    return {
      member,
    }
  }
}
