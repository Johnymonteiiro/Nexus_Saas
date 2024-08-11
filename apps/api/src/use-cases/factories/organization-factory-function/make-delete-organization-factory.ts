import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { DeleteOrganizationUseCase } from '@/use-cases/organization-use-case/delete-organization-use-case'

export function MakeDeleteOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const deleteOrganizationDeleteUseCase = new DeleteOrganizationUseCase(
    organizationsRepository,
  ) // instance the users use-case class

  return deleteOrganizationDeleteUseCase
}
