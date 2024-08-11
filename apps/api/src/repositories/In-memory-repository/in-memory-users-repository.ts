import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { UserInterface } from '../Prisma/users/user-interface'

export class InMemoryUsersRepository implements UserInterface {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async deleteUser(id: string) {
    const index = this.items.findIndex((item) => item.id === id)
    this.items.splice(index, 1)

    const user = this.items.find((item) => item.id === id)

    return user === undefined ? null : user
  }

  async updateUser(data: Prisma.UserUpdateInput, id: string) {
    const user = this.items.find((item) => item.id === id)
    if (user !== undefined) {
      user.description = `${data.description}`
      user.position = `${data.position}`
      user.imageUrl = `${data.imageUrl}`
      user.profession = `${data.profession}`
      user.phoneNumber = `${data.phoneNumber}`
    }

    return user as User
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      description: data.description ?? null,
      profession: data.profession ?? null,
      position: data.position ?? null,
      phoneNumber: data.phoneNumber ?? null,
      imageUrl: data.imageUrl ?? null,
      status_profile: data.status_profile ?? null,
      created_at: new Date(),
      updatedAt: new Date(),
      role: [],
    }

    this.items.push(user)

    return user
  }
}
