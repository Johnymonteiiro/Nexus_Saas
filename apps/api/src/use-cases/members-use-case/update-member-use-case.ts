import { Member, Role, StatusProfile } from '@prisma/client'

import { MembersInterface } from '@/repositories/Prisma/members/members-interface'

import { MemberNotExistError } from '../errors/member-not-exist-error'

interface UpdateMemberUseCaseRequest {
  memberId: string
  userId: string
  organizationId: string
  role: Role
  statusProfile: StatusProfile
  slug: string
}

interface UpdateMemberUseCaseResponse {
  member: Member
}

export class UpdateMemberUseCase {
  constructor(private membersRepository: MembersInterface) {}

  async execute({
    memberId,
    userId,
    role,
    organizationId,
    statusProfile,
    slug,
  }: UpdateMemberUseCaseRequest): Promise<UpdateMemberUseCaseResponse> {
    const memberAlreadyExist = await this.membersRepository.findMemberByUserId(
      userId,
      slug,
    )

    if (!memberAlreadyExist) {
      throw new MemberNotExistError()
    }

    const data = {
      organizationId,
      role,
      status_profile: statusProfile,
    }

    const member = await this.membersRepository.upDateMembers(
      data,
      memberId,
      organizationId,
    )

    return {
      member,
    }
  }
}
