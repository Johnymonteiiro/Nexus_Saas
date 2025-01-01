import {
  Member,
  Organization,
  Prisma,
  Role,
  StatusProfile,
  User,
} from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  MemberDetails,
  MembersInterface,
} from '../Prisma/members/members-interface'

export class InMemoryMembersRepository implements MembersInterface {
  public items: MemberDetails[] = []
  public org: Organization[] = [
    {
      id: '12345',
      name: 'Leadcode',
      slug: 'leadcode',
      domain: 'leadcode@acm.com',
      description: 'teste',
      shouldAttachUsersByDomain: true,
      imageUrl: 'testeImage',
      created_at: new Date(),
      updatedAt: new Date(),
      ownerId: randomUUID(),
      deletedAt: new Date(),
      archivedAt: new Date(),
      status: 'ACTIVE',
    },
  ]

  public users: User[] = [
    {
      id: '12345',
      name: 'carlos',
      globalRole: 'ADMIN',
      email: '',
      passwordHash: '',
      description: '',
      profession: '',
      position: '',
      phoneNumber: '',
      imageUrl: '',
      created_at: new Date(),
      updatedAt: new Date(),
    },
  ]

  async findMemberByUserId(userId: string, slug: string) {
    const member = this.items.find((member) => member.userId === userId)
    const org = this.org.find(
      (org) => org.slug === slug && org.ownerId === member?.userId,
    )

    if (!member && !org) {
      return null
    }

    return member as MemberDetails
  }

  async upDateMembers(
    data: Prisma.MemberUncheckedUpdateInput,
    memberId: string,
    organizationId: string,
  ) {
    const member = this.items.find((member) => member.id === memberId)
    const org = this.org.find(
      (org) => org.id === organizationId && org.id === member?.organizationId,
    )

    if (member !== undefined) {
      member.role = data.role as Role
      member.status_profile = data.status_profile as StatusProfile
    }
    if (!member && !org) {
      return null
    }

    return member as Member
  }

  async addMembers(data: Prisma.MemberUncheckedCreateInput) {
    const member = {
      id: randomUUID(),
      role: data.role,
      status_profile: data.status_profile,
      userId: data.userId,
      organizationId: data.organizationId,
    }

    this.items.push(member as MemberDetails)

    return member as Member
  }

  async searchMember(query: string, slug: string) {
    const user = this.users.find((user) => user.name === query)
    const orgs = this.org.find((org) => org.slug === slug)

    if (!orgs) {
      return []
    }

    return this.items.filter(
      (item) => item.organizationId === orgs.id && user?.id === item.userId,
    )
  }

  async findByMemberId(memberId: string, slug: string) {
    const member = this.items.find((member) => member.id === memberId)
    const org = this.org.find(
      (org) => org.slug === slug && org.id === member?.organizationId,
    )

    if (!member && !org) {
      return null
    }

    return member as Member
  }

  async findMany(slug: string, page: number) {
    const orgs = this.org.find((org) => org.slug === slug)

    if (!orgs) {
      return []
    }

    return this.items
      .filter((item) => item.organizationId === orgs.id)
      .slice((page - 1) * 20, page * 20)
  }

  async deleteMemberOnOrganization(memberId: string, slug: string) {
    const orgs = this.org.find(
      (org) => org.slug === slug && org.ownerId === memberId,
    )

    if (!orgs) {
      return null
    }

    const index = this.items.findIndex((item) => item.userId === orgs?.ownerId)
    this.items.splice(index, 1)

    const member = this.items.find((item) => item.userId === orgs?.ownerId)

    return member === undefined ? null : member
  }
}
