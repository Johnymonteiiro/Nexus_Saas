import { Invite, Member, Organization, Prisma, Project } from '@prisma/client'

export type OrganizationDetails = Organization & {
  members: Member[]
  projects: Project[]
  invites: Invite[]
}

export interface OrganizationInterface {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByDomain(domain: string): Promise<Organization | null>
  findBySlug(slug: string): Promise<OrganizationDetails | null>
  deleteOrganization(id: string): Promise<Organization | null>
  updateOrganization(
    data: Prisma.OrganizationUpdateInput,
    id: string,
  ): Promise<Organization>
}
