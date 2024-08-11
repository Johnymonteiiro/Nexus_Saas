import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'

import { AuthenticateUserCase } from '../user-authenticate-use-case'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUserCase

describe('User Authenticate', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserCase(userRepository)
  })

  it('Should be able to authenticate user', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'john@gmail.com.br',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'john@gmail.com.br',
        password: '12345',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'john@gmail.com.br',
        password: '12365',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
