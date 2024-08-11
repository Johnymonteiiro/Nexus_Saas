import { AccountProvider, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { UserInterface } from '@/repositories/Prisma/users/user-interface'

interface Create0AuthUseCaseRequest {
  name: string
  email: string | null
  avatarUrl: string
  githubId: string
  provider: AccountProvider
}

interface Create0AuthUseCaseResponse {
  user: User
}

export class Create0AuthUseCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    avatarUrl,
    email,
    githubId,
    name,
    provider,
  }: Create0AuthUseCaseRequest): Promise<Create0AuthUseCaseResponse> {
    if (email === null) {
      throw new Error(
        `Your ${provider} account must have email to authenticate`,
      )
    }

    let user = await this.userRepository.findByEmail(email)

    if (!user) {
      user = await this.userRepository.create({
        name,
        email,
        imageUrl: avatarUrl,
        passwordHash: '',
      })
    }

    let account = await prisma.account.findUnique({
      where: {
        provider_userId: {
          provider,
          userId: user.id,
        },
      },
    })

    if (!account) {
      account = await prisma.account.create({
        data: {
          provider,
          providerAccountId: githubId,
          userId: user.id,
        },
      })
    }

    return {
      user,
    }
  }
}
