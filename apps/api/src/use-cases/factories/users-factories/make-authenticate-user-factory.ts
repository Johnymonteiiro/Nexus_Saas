import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { AuthenticateUserCase } from '@/use-cases/users-use-case/user-authenticate-use-case'

export function MakeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUserRepository() // instance the repository
  const authenticateUserUseCase = new AuthenticateUserCase(usersRepository) // instance the users use-case class

  return authenticateUserUseCase
}
