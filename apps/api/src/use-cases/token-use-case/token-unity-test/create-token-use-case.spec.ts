import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTokensRepository } from '@/repositories/In-memory-repository/in-memory-token-repository'
import { InMemoryUsersRepository } from '@/repositories/In-memory-repository/in-memory-users-repository'

import { CreateUserUseCase } from '../../users-use-case/user-create-use-case'
import { RecoveryPasswordTokenUseCase } from '../recovery-password-token-use-case'

let tokenRepository: InMemoryTokensRepository
let userRepository: InMemoryUsersRepository
let sut: RecoveryPasswordTokenUseCase
let userUseCase: CreateUserUseCase

describe('Create tokens', () => {
  beforeEach(() => {
    tokenRepository = new InMemoryTokensRepository()
    userRepository = new InMemoryUsersRepository()
    sut = new RecoveryPasswordTokenUseCase(tokenRepository, userRepository)
    userUseCase = new CreateUserUseCase(userRepository)
  })

  it('Should be able to generate a user token', async () => {
    const { user } = await userUseCase.execute({
      name: 'Jhon Doe',
      email: 'john@gmail.com.br',
      password: '12345',
    })
    const { passwordToken } = await sut.execute({
      email: user.email,
      type: 'PASSWORD_RECOVERY',
    })
    expect(passwordToken.userId).toEqual(user.id)
  })
})
