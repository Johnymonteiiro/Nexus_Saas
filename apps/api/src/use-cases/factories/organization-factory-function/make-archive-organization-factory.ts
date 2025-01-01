import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { ArchiveOrganizationUseCase } from '@/use-cases/organization-use-case/archive-organization-use-case'

export function MakeArchiveOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const archiveOrganizationArchiveUseCase = new ArchiveOrganizationUseCase(
    organizationsRepository,
  ) // instance the users use-case class

  return archiveOrganizationArchiveUseCase
}
