import { PrismaMembersRepository } from '@/repositories/Prisma/members/prisma-members-repository'
import { AddMemberUseCase } from '@/use-cases/members-use-case/add-member-use-case'

export function MakeAddMemberUseCase() {
  const membersRepository = new PrismaMembersRepository() // instance the repository
  const addMemberUseCase = new AddMemberUseCase(membersRepository) // instance the users use-case class

  return addMemberUseCase
}
