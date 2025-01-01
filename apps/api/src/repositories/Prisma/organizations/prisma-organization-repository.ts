import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrganizationInterface } from './organization-interface'

export class PrismaOrganizationRepository implements OrganizationInterface {
  async searchOrganization(query: string) {
    const organization = await prisma.organization.findMany({
      where: {
        status: 'ACTIVE',
        name: {
          contains: query,
        },
      },
    })

    return organization
  }

  async searchArchivedOrganization(query: string) {
    const organization = await prisma.organization.findMany({
      where: {
        status: 'ARCHIVED',
        name: {
          contains: query,
        },
      },
    })

    return organization
  }

  async findMany(page: number) {
    const organizations = await prisma.organization.findMany({
      where: {
        deletedAt: null,
        archivedAt: null,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        created_at: true,
        updatedAt: true,
        name: true,
        description: true,
        status: true,
        slug: true,
        imageUrl: true,
        owner: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return organizations
  }

  async findManyArchived(page: number) {
    const organizations = await prisma.organization.findMany({
      where: {
        status: 'ARCHIVED',
        archivedAt: {
          not: null,
        },
      },
      select: {
        id: true,
        archivedAt: true,
        name: true,
        description: true,
        status: true,
        slug: true,
        imageUrl: true,
        owner: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return organizations
  }

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
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return organization
  }

  async archiveOrganizationById(id: string) {
    const organization = prisma.organization.update({
      where: {
        id,
        status: 'ARCHIVED',
      },
      data: {
        archivedAt: new Date(),
      },
    })

    return organization
  }

  async deleteOrganization(id: string) {
    const organization = prisma.organization.delete({
      where: {
        id,
        status: 'ARCHIVED',
        archivedAt: {
          not: null,
        },
      },
      select: {
        archivedAt: true,
        id: true,
      },
    })

    return organization
  }
}
