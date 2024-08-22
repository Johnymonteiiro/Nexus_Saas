import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { MembersInterface } from './members-interface'

export class PrismaMembersRepository implements MembersInterface {
  async addMembers(data: Prisma.MemberUncheckedCreateInput) {
    const members = prisma.member.create({
      data,
    })

    return members
  }

  async upDateMembers(
    data: Prisma.MemberUncheckedUpdateInput,
    memberId: string,
    organizationId: string,
  ) {
    const member = prisma.member.update({
      where: {
        id: memberId,
        organizationId,
      },
      data,
    })

    return member
  }

  async searchMember(query: string, slug: string) {
    const member = prisma.member.findMany({
      where: {
        user: {
          name: {
            contains: query,
          },
        },
        Organization: {
          slug,
        },
      },
      include: {
        Organization: true,
        user: true,
      },
    })

    return member
  }

  async findByMemberId(memberId: string, slug: string) {
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
        Organization: {
          slug,
        },
      },
      include: {
        Organization: true,
      },
    })

    return member
  }

  async findMemberByUserId(userId: string, slug: string) {
    const member = await prisma.member.findFirst({
      where: {
        userId,
        Organization: {
          slug,
        },
      },
      include: {
        Organization: true,
      },
    })

    return member
  }

  async findMany(slug: string, page: number) {
    const members = await prisma.member.findMany({
      where: {
        Organization: {
          slug,
        },
      },
      include: {
        Organization: true,
        user: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return members
  }

  async deleteMemberOnOrganization(memberId: string, slug: string) {
    const member = await prisma.member.delete({
      where: {
        id: memberId,
        Organization: {
          slug,
        },
      },
    })

    return member
  }
}
