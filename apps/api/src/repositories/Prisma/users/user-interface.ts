import { Prisma, User } from '@prisma/client'

export interface UserInterface {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  deleteUser(id: string): Promise<User | null>
  updateUser(data: Prisma.UserUpdateInput, id: string): Promise<User>
  searchMany(query: string, page: number): Promise<User[]>
}
