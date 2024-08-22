import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { OrganizationInterface } from '../Prisma/organizations/organization-interface'

export class InMemoryOrganizationsRepository implements OrganizationInterface {
  public items: Organization[] = []

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
      organization.id = `${data.id}`
      organization.name = `${data.name}`
      organization.slug = `${data.slug}`
      organization.shouldAttachUsersByDomain = true
      organization.imageUrl = `${data.imageUrl ?? null}`
      organization.domain = `${data.domain ?? null}`
      organization.description = `${data.description ?? null}`
      organization.created_at = data.created_at as Date
      organization.updatedAt = data.updatedAt as Date
      organization.ownerId = randomUUID()
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

    return organization
  }
}
