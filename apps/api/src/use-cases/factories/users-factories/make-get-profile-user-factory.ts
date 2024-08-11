import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { GetProfileUserCase } from '@/use-cases/users-use-case/user-get-profile-use-case'

export function MakeGetProfileUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const getProfileUserUseCase = new GetProfileUserCase(userRepository)

  return getProfileUserUseCase
}
