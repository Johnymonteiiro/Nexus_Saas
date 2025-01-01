import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { SearchArchivedOrganizationUseCase } from '@/use-cases/organization-use-case/search-archived-organization-use-case'

export function MakeSearchArchivedOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const searchArchivedOrganizationUseCase =
    new SearchArchivedOrganizationUseCase(organizationsRepository) // instance the users use-case class

  return searchArchivedOrganizationUseCase
}
