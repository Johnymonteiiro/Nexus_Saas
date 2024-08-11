import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { TokenInterface } from '@/repositories/Prisma/tokens/token-interface'
import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { InvalidCredentialError } from '../errors/invalid-credentials-error'

interface ResetPasswordTokenUseCaseRequest {
  userId: string
  password: string
}

interface ResetPasswordTokenUseCaseResponse {
  user: User
}

export class ResetPasswordTokenUseCase {
  constructor(
    private userRepository: UserInterface,
    private tokenRepository: TokenInterface,
  ) {}

  async execute({
    password,
    userId,
  }: ResetPasswordTokenUseCaseRequest): Promise<ResetPasswordTokenUseCaseResponse> {
    const userTokenId = await this.tokenRepository.findByUserId(userId)

    if (!userTokenId) {
      throw new InvalidCredentialError()
    }
    const passwordHash = await hash(password, 6)
    const user = await this.userRepository.updateUser(
      { passwordHash },
      userTokenId.userId,
    )

    return {
      user,
    }
  }
}
