import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { SearchOrganizationUseCase } from '@/use-cases/organization-use-case/search-organization-use-case'

export function MakeSearchOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const searchOrganizationUseCase = new SearchOrganizationUseCase(
    organizationsRepository,
  )

  return searchOrganizationUseCase
}
