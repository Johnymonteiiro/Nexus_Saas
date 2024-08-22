import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { GetMembersUseCase } from '@/use-cases/members-use-case/get-members-use-case'

export function MakeGetMembersUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const membersRepository = new PrismaMembersRepository()
  const getMembersUseCase = new GetMembersUseCase(
    membersRepository,
    organizationsRepository,
  )

  return getMembersUseCase
}
