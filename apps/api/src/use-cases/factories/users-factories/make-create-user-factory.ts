import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { CreateUserUseCase } from '@/use-cases/users-use-case/user-create-use-case'

export function MakeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository() // instance the repository
  const createUserUseCase = new CreateUserUseCase(userRepository) // instance the users use-case class

  return createUserUseCase
}
