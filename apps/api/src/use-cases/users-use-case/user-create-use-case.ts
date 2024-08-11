import { StatusProfile, User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UserAlreadyExistError } from '../errors/user-already-exist-error'

interface CreateUserCaseRequest {
  name: string
  email: string
  password: string
  description?: string
  profession?: string
  position?: string
  phone_number?: string
  image?: string
  status_profile?: StatusProfile
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
