import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { DeleteMembersUseCase } from '@/use-cases/members-use-case/delete-members-use-case'

export function MakeDeleteMemberUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const deleteMemberUseCase = new DeleteMembersUseCase(membersRepository)
  return deleteMemberUseCase
}
