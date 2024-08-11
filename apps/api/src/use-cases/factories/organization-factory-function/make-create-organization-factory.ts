import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { CreateOrganizationUseCase } from '@/use-cases/organization-use-case/create-organization-use-case'

export function MakeCreateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository() // instance the repository
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationRepository,
  ) // instance the users use-case class

  return createOrganizationUseCase
}
