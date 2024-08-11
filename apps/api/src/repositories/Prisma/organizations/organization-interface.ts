import { Organization, Prisma } from '@prisma/client'

export interface OrganizationInterface {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByDomain(domain: string): Promise<Organization | null>
  deleteOrganization(id: string): Promise<Organization | null>
  updateOrganization(
    data: Prisma.OrganizationUpdateInput,
    id: string,
  ): Promise<Organization>
}
