import { User } from '@prisma/client'

import { UserInterface } from '@/repositories/Prisma/users/user-interface'

interface SearchManyUserUseCaseRequest {
  query: string
  page: number
}

interface SearchManyUserCaseResponse {
  users: User[]
}

export class SearchManyUserUseCase {
  constructor(private userRepository: UserInterface) {}

  async execute({
    query,
    page,
  }: SearchManyUserUseCaseRequest): Promise<SearchManyUserCaseResponse> {
    const users = await this.userRepository.searchMany(query, page)

    return {
      users,
    }
  }
}
