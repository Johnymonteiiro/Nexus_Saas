import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import {
  InvalidCredentialError,
  InvalidPasswordError,
} from '../errors/invalid-credentials-error'

interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  user: User
}

export class AuthenticateUserCase {
  constructor(private usersRepository: UserInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    if (user.passwordHash === null) {
      throw new InvalidPasswordError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash) // compare the password

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
