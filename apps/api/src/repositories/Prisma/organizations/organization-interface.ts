import {
  $Enums,
  Invite,
  Member,
  Organization,
  Prisma,
  Project,
} from '@prisma/client'

export type OrganizationDetails = Organization & {
  members: Member[]
  projects: Project[]
  invites: Invite[]
}

export type GetAllOrganizationDetails = {
  description: string | null
  status: $Enums.StatusOrganization | null
  name: string
  imageUrl: string | null
  slug: string
  id: string
  created_at: Date
  updatedAt: Date | null
  owner: {
    name: string
    imageUrl: string | null
    id: string
  }
}
export type GetAllOrganizationArchivedDetails = {
  description: string | null
  status: $Enums.StatusOrganization | null
  name: string
  imageUrl: string | null
  slug: string
  id: string
  archivedAt: Date | null
  owner: {
    name: string
    imageUrl: string | null
    id: string
  }
}

export type DeleteOrganizationArchived = {
  id: string
  archivedAt: Date | null
}

export interface OrganizationInterface {
  findMany(page: number): Promise<GetAllOrganizationDetails[]>
  searchOrganization(query: string): Promise<Organization[]>
  searchArchivedOrganization(query: string): Promise<Organization[]>
  findManyArchived(page: number): Promise<GetAllOrganizationArchivedDetails[]>
  archiveOrganizationById(id: string): Promise<Organization | null>

  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByDomain(domain: string): Promise<Organization | null>
  findBySlug(slug: string): Promise<OrganizationDetails | null>
  deleteOrganization(id: string): Promise<DeleteOrganizationArchived | null>
  updateOrganization(
    data: Prisma.OrganizationUpdateInput,
    id: string,
  ): Promise<Organization>
}
