import { Prisma, Token } from '@prisma/client'

export interface TokenInterface {
  create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>
  findByUserId(userId: string): Promise<{ userId: string } | null>
}
