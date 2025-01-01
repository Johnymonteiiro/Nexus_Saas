import { Organization, Prisma, StatusOrganization } from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  OrganizationDetails,
  OrganizationInterface,
} from '../Prisma/organizations/organization-interface'

export class InMemoryOrganizationsRepository implements OrganizationInterface {
  public items: Organization[] = []
  async findMany(page: number) {
    const data = this.items
      .filter((org) => org.status === 'ACTIVE')
      .slice((page - 1) * 20, page * 20)
    const organization = data.map((org) => {
      return {
        ...org,
        owner: {
          name: 'ANA',
          imageUrl: '',
          id: org.ownerId,
        },
      }
    })
    return organization
  }

  async searchOrganization(query: string) {
    const organization = this.items.filter(
      (org) => org.name === query && org.status !== 'ARCHIVED',
    )
    return organization
  }

  async searchArchivedOrganization(query: string) {
    const organization = this.items.filter(
      (org) => org.name === query && org.status === 'ARCHIVED',
    )
    return organization
  }

  async findManyArchived(page: number) {
    const data = this.items
      .filter((org) => org.status === 'ARCHIVED')
      .slice((page - 1) * 20, page * 20)
    const organization = data.map((org) => {
      return {
        ...org,
        owner: {
          name: 'ANA',
          imageUrl: '',
          id: org.ownerId,
        },
      }
    })
    return organization
  }

  async archiveOrganizationById(id: string) {
    const organization = this.items.find((org) => org.id === id)

    if (!organization) {
      return null
    }

    organization.status = 'ARCHIVED'

    return organization
  }

  async deleteOrganization(id: string) {
    const index = this.items.findIndex((item) => item.id === id)
    this.items.splice(index, 1)

    const organization = this.items.find((item) => item.id === id)

    if (organization === undefined) {
      return null
    }

    return organization
  }

  async updateOrganization(data: Prisma.OrganizationUpdateInput, id: string) {
    const organization = this.items.find((item) => item.id === id)
    if (organization !== undefined) {
      organization.name = `${data.name}`
      organization.shouldAttachUsersByDomain =
        data.shouldAttachUsersByDomain as boolean
      organization.imageUrl = `${data.imageUrl}`
      organization.description = `${data.description}`
      organization.status = data.status as StatusOrganization
    }

    return organization as Organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      slug: data.slug,
      domain: data.domain ?? null,
      description: 'teste',
      shouldAttachUsersByDomain: true,
      imageUrl: 'testeImage',
      created_at: new Date(),
      updatedAt: new Date(),
      archivedAt: new Date(),
      deletedAt: new Date(),
      status: 'ACTIVE' as StatusOrganization,
      ownerId: randomUUID(),
      projects: [],
      members: [],
      invites: [],
    }

    this.items.push(organization)

    return organization
  }

  async findByDomain(domain: string) {
    const organization = this.items.find(
      (organization) => organization.domain === domain,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findBySlug(slug: string) {
    const organization = this.items.find(
      (organization) => organization.slug === slug,
    )

    if (!organization) {
      return null
    }

    return organization as OrganizationDetails
  }
}
