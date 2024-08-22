import { Role, User } from '@prisma/client'

import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UsersNotFoundError } from '../errors/users-not-found-error'

interface UpdateUserCaseRequest {
  userId: string
  description?: string
  profession?: string
  position?: string
  phoneNumber?: string
  imageUrl?: string
  globalRole: Role
}

interface UpdateUserCaseResponse {
  user: User
}

export class UpdateUserCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    userId,
    description,
    imageUrl,
    phoneNumber,
    position,
    profession,
    globalRole,
  }: UpdateUserCaseRequest): Promise<UpdateUserCaseResponse> {
    const data = {
      description,
      imageUrl,
      phoneNumber,
      position,
      profession,
      globalRole,
    }

    const userNotExist = await this.userRepository.findById(userId)

    if (!userNotExist) {
      throw new UsersNotFoundError()
    }

    const user = await this.userRepository.updateUser(data, userId)

    return { user }
  }
}
