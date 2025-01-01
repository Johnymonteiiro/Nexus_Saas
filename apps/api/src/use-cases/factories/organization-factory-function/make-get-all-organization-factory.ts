import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { GetAllOrganizationUseCase } from '@/use-cases/organization-use-case/get-all-organization-use-case'

export function MakeGetAllOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const getAllOrganizationUseCase = new GetAllOrganizationUseCase(
    organizationsRepository,
  ) // instance the users use-case class

  return getAllOrganizationUseCase
}
