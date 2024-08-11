import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'
import { UserAlreadyExistError } from '@/use-cases/errors/user-already-exist-error'

import { CreateUserUseCase } from '../user-create-use-case'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create users', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('Should be able to create a suer', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should has user password hashed upon create', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with the same email twice', async () => {
    const email = 'john@gmail.com.br'
    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '12345',
    })

    expect(async () => {
      await sut.execute({
        name: 'Jhon Doe',
        email,
        password: '12345',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
