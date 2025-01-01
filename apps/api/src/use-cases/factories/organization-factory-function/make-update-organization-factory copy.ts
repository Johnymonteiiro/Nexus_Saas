import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { UpdateOrganizationUseCase } from '@/use-cases/organization-use-case/update-organization-use-case'

export function MakeUpdateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() 
  const updateOrganizationUpdateUseCase = new UpdateOrganizationUseCase(
    organizationsRepository,
  )

  return updateOrganizationUpdateUseCase
}
