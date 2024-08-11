import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'

import { SearchManyUserUseCase } from '../user-searchMany-use-case'

let userRepository: InMemoryUsersRepository
let sut: SearchManyUserUseCase

describe('Search Many Users', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new SearchManyUserUseCase(userRepository)
  })

  it('Should be able to search users by query', async () => {
    const user = await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    const users = await sut.execute({
      query: 'Jhon Doe',
      page: 1,
    })

    expect(users.users.length).toBeGreaterThan(0)
    expect(users.users[0].name).toEqual(user.name)
  })

  it('Should  be able to throw error message not found users', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    const userFounded = await sut.execute({
      query: 'Mark Josh',
      page: 1,
    })
    expect(userFounded.users.length).toEqual(0)
  })
})
