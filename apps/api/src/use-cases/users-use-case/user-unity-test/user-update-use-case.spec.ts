import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'
import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'

import { UpdateUserCase } from '../user-update-use-case'

let userRepository: InMemoryUsersRepository
let sut: UpdateUserCase

describe('User Profile', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new UpdateUserCase(userRepository)
  })

  it('Should be able to update user profile', async () => {
    const user = await userRepository.create({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      passwordHash: await hash('12345', 6),
    })

    const userProfile = await sut.execute({
      userId: user.id,
      description: 'Testing updateUser',
      imageUrl: 'http://localhoat:3000/png',
      phoneNumber: '1234567890',
      position: 'Manager',
      profession: 'Frontend',
    })

    expect(userProfile.user).toEqual(
      expect.objectContaining({
        name: 'Jhon Doe',
      }),
    )

    expect(user.profession).toEqual('Frontend')
  })

  it('Should not be able to update profile with wrong id', async () => {
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
