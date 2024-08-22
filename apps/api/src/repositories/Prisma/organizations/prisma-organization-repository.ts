import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrganizationInterface } from './organization-interface'

export class PrismaOrganizationRepository implements OrganizationInterface {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organizations = await prisma.organization.create({
      data,
    })

    return organizations
  }

  async findByDomain(domain: string) {
    const organization = prisma.organization.findFirst({
      where: {
        domain,
      },
      include: {
        members: true,
        projects: true,
        invites: true,
      },
    })

    return organization
  }

  async findBySlug(slug: string) {
    const organization = prisma.organization.findFirst({
      where: {
        slug,
      },
      include: {
        members: true,
        projects: true,
        invites: true,
      },
    })

    return organization
  }

  async updateOrganization(data: Prisma.OrganizationUpdateInput, id: string) {
    const organization = prisma.organization.update({
      where: {
        id,
      },
      data,
    })

    return organization
  }

  async deleteOrganization(id: string) {
    const organization = prisma.organization.delete({
      where: {
        id,
      },
    })

    return organization
  }
}
