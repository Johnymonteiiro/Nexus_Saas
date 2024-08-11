import { PrismaTokenRepository } from '@/repositories/Prisma/tokens/prisma-token-repository'
import { PrismaUserRepository } from '@/repositories/Prisma/users/prisma-user-repository'
import { ResetPasswordTokenUseCase } from '@/use-cases/token-use-case/reset-password-token-use-case'

export function MakeResetPasswordTokenUseCase() {
  const userRepository = new PrismaUserRepository()
  const tokenRepository = new PrismaTokenRepository()
  const resetPasswordTokenUseCase = new ResetPasswordTokenUseCase(
    userRepository,
    tokenRepository,
  )

  return resetPasswordTokenUseCase
}
