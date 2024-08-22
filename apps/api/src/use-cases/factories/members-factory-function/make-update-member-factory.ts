import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { UpdateMemberUseCase } from '@/use-cases/members-use-case/update-member-use-case'

export function MakeUpdateMemberUseCase() {
  const membersRepository = new PrismaMembersRepository() // instance the repository
  const updateMemberUseCase = new UpdateMemberUseCase(membersRepository) // instance the users use-case class

  return updateMemberUseCase
}
