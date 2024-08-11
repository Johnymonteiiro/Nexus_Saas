import { Prisma, Token } from '@prisma/client'
import { randomUUID } from 'crypto'

import { TokenInterface } from '../Prisma/tokens/token-interface'

export class InMemoryTokensRepository implements TokenInterface {
  public items: Token[] = []

  async create(data: Prisma.TokenUncheckedCreateInput) {
    const token = {
      id: randomUUID(),
      type: data.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    }

    this.items.push(token)

    return token
  }

  async findByUserId(userId: string) {
    const user = this.items.find((user) => user.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
