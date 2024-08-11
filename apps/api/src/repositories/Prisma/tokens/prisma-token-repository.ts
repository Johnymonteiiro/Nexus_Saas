import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { TokenInterface } from './token-interface'

export class PrismaTokenRepository implements TokenInterface {
  async create(data: Prisma.TokenUncheckedCreateInput) {
    const tokens = await prisma.token.create({
      data,
    })

    return tokens
  }

  async findByUserId(userId: string) {
    const userTokenId = await prisma.token.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
      },
    })

    return userTokenId
  }
}
