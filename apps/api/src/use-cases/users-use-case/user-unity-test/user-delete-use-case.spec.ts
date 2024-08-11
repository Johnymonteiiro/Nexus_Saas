import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'
import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'

import { DeleteUserCase } from '../user-delete-use-case'

let userRepository: InMemoryUsersRepository
let sut: DeleteUserCase

describe('User Delete', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new DeleteUserCase(userRepository)
  })

  it('Should be able to delete user by id', async () => {
    const user = await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    const userDeleted = await sut.execute({
      userId: user.id,
    })

    expect(userDeleted.user).toBe(null)
  })

  it('Should not be able to delete user with wrong id', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    expect(async () => {
      await sut.execute({
        userId: '123456qwert',
      })
    }).rejects.toBeInstanceOf(UsersNotFoundError)
  })
})
