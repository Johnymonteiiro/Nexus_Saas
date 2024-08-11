import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { DeleteUserCase } from '@/use-cases/users-use-case/user-delete-use-case'

export function MakeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const deleteUserUseCase = new DeleteUserCase(userRepository)

  return deleteUserUseCase
}
