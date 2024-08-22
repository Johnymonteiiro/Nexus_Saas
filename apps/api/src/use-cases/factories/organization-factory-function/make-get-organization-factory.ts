import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { GetOrganizationUseCase } from '@/use-cases/organization-use-case/get-organization-use-case'

export function MakeGetOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const getOrganizationUseCase = new GetOrganizationUseCase(
    organizationsRepository,
  ) // instance the users use-case class

  return getOrganizationUseCase
}
