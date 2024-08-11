import { User } from '@prisma/client'

import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UsersNotFoundError } from '../errors/users-not-found-error'

interface DeleteUserCaseRequest {
  userId: string
}

interface DeleteUserCaseResponse {
  user: User | null
}

export class DeleteUserCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    userId,
  }: DeleteUserCaseRequest): Promise<DeleteUserCaseResponse> {
    const userNotExist = await this.userRepository.findById(userId)

    if (!userNotExist) {
      throw new UsersNotFoundError()
    }

    const user = await this.userRepository.deleteUser(userId)
    return { user }
  }
}
