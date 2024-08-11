import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'

import { UserInterface } from './user-interface'

export class PrismaUserRepository implements UserInterface {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        members_on: true,
        owns_organizations: true,
        owns_projects: true,
        owns_subtasks: true,
        owns_tasks: true,
        tokens: true,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async updateUser(data: Prisma.UserUpdateInput, id: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  }

  async deleteUser(id: string) {
    const user = prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }

  async searchMany(query: string, page: number) {
    const users = prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    if ((await users).length < 0) {
      throw new UsersNotFoundError()
    }

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const users = await prisma.user.create({
      data,
    })

    return users
  }
}
