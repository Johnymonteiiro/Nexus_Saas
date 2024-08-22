import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { GetMemberUseCase } from '@/use-cases/members-use-case/get-member-use-case'

export function MakeGetMemberUseCase() {
  // instance the repository
  const membersRepository = new PrismaMembersRepository()
  const getMemberUseCase = new GetMemberUseCase(membersRepository)

  return getMemberUseCase
}
