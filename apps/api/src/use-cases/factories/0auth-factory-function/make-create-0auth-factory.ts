import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { Create0AuthUseCase } from '@/use-cases/0auth-use-case/create-0auth-use-case'

export function MakeCreate0AuthUseCase() {
  const userRepository = new PrismaUserRepository()
  const OauthUseCase = new Create0AuthUseCase(userRepository) // instance the users use-case class

  return OauthUseCase
}
