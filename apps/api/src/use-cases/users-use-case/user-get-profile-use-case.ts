import { User } from '@prisma/client'

import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UsersNotFoundError } from '../errors/users-not-found-error'

interface GetProfileUserCaseRequest {
  userId: string
}

interface GetProfileUserCaseResponse {
  user: User | null
}

/// Create after the test file

export class GetProfileUserCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    userId,
  }: GetProfileUserCaseRequest): Promise<GetProfileUserCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UsersNotFoundError()
    }
    return { user }
  }
}
