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

  findByDomain(domain: string) {
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

  updateOrganization(data: Prisma.OrganizationUpdateInput, id: string) {
    const organization = prisma.organization.update({
      where: {
        id,
      },
      data,
    })

    return organization
  }

  deleteOrganization(id: string) {
    const organization = prisma.organization.delete({
      where: {
        id,
      },
    })

    return organization
  }
}
