import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { SearchManyUserUseCase } from '@/use-cases/users-use-case/user-searchMany-use-case'

export function MakeSearchManyUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const userSearchUseCase = new SearchManyUserUseCase(userRepository)

  return userSearchUseCase
}
