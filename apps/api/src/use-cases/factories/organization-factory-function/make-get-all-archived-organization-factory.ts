import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { GetAllArchivedOrganizationUseCase } from '@/use-cases/organization-use-case/get-all-archived-organization-use-case'

export function MakeGetAllArchivedOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const getAllArchivedOrganizationUseCase =
    new GetAllArchivedOrganizationUseCase(organizationsRepository) // instance the users use-case class

  return getAllArchivedOrganizationUseCase
}
