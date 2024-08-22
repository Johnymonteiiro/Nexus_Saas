import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UserAlreadyExistError } from '../errors/user-already-exist-error'

interface CreateUserCaseRequest {
  name: string
  email: string
  password: string
  globalRole: Role
}

interface CreateUserCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    name,
    email,
    password,
    globalRole,
  }: CreateUserCaseRequest): Promise<CreateUserCaseResponse> {
    const passwordHash = await hash(password, 6)
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const [, domain] = email.split('@') // redirect user to organization by domain

    const autoJoinOrganization = await prisma.organization.findFirst({
      where: {
        domain,
        shouldAttachUsersByDomain: true,
      },
    })

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
      globalRole,
      members_on: autoJoinOrganization
        ? {
            create: {
              organizationId: autoJoinOrganization.id,
            },
          }
        : undefined,
    })

    return { user }
  }
}
