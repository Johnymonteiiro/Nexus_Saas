import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { UpdateUserCase } from '@/use-cases/users-use-case/user-update-use-case'

export function MakeUpdateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserCase(userRepository)

  return updateUserUseCase
}
