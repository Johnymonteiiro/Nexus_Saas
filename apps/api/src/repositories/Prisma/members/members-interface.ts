import { Member, Organization, Prisma, User } from '@prisma/client'

export type MemberDetails = Member & {
  user: User
  Organization: Organization
}

type MemberWithOrganization = Member & {
  Organization: Organization
}

export interface MembersInterface {
  findByMemberId(memberId: string, slug: string): Promise<Member | null>
  findMany(slug: string, page: number): Promise<MemberDetails[]>
  findMemberByUserId(
    userId: string,
    slug: string,
  ): Promise<MemberWithOrganization | null>
  deleteMemberOnOrganization(
    memberId: string,
    slug: string,
  ): Promise<Member | null>

  addMembers(data: Prisma.MemberUncheckedCreateInput): Promise<Member>
  upDateMembers(
    data: Prisma.MemberUncheckedUpdateInput,
    memberId: string,
    organizationId: string,
  ): Promise<Member>
  searchMember(query: string, slug: string): Promise<MemberDetails[]>
}
