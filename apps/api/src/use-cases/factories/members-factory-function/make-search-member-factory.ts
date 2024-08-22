import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { PrismaOrganizationRepository } from '@/repositories/Prisma/organizations/prisma-organization-repository'
import { SearchMembersUseCase } from '@/use-cases/members-use-case/search-members-use-case'

export function MakeSearchMemberUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository() // instance the repository
  const membersRepository = new PrismaMembersRepository()
  const searchMemberUseCase = new SearchMembersUseCase(
    membersRepository,
    organizationsRepository,
  )

  return searchMemberUseCase
}
