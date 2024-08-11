import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { UpdateOrganizationUseCase } from '@/use-cases/organization-use-case/update-organization-use-case'

export function MakeUpdateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const updateOrganizationUpdateUseCase = new UpdateOrganizationUseCase(
    organizationsRepository,
  ) // instance the users use-case class

  return updateOrganizationUpdateUseCase
}
