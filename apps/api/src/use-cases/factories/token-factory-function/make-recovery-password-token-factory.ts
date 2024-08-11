import { PrismaTokenRepository } from '@/repositories/Prisma/tokens/prisma-token-repository'
import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { RecoveryPasswordTokenUseCase } from '@/use-cases/token-use-case/recovery-password-token-use-case'

export function MakeRecoveryPasswordTokenUseCase() {
  const userRepository = new PrismaUserRepository()
  const tokenRepository = new PrismaTokenRepository() // instance the repository

  const recoveryPasswordTokenUseCase = new RecoveryPasswordTokenUseCase(
    tokenRepository,
    userRepository,
  ) // instance the users use-case class

  return recoveryPasswordTokenUseCase
}
