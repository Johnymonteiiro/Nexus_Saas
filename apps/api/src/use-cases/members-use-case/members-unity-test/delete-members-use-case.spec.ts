import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'

import { AddMemberUseCase } from '../add-member-use-case'
import { DeleteMembersUseCase } from '../delete-members-use-case'

let membersRepository: InMemoryMembersRepository
let sutAdd: AddMemberUseCase
let sut: DeleteMembersUseCase

describe('Delete a members', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sutAdd = new AddMemberUseCase(membersRepository)
    sut = new DeleteMembersUseCase(membersRepository)
  })

  it('Should be able to delete members on the organization', async () => {
    const { member: newMember } = await sutAdd.execute({
      organizationId: '12345',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId: randomUUID(),
    })

    const { member } = await sut.execute({
      slug: 'leadcode',
      userId: newMember.userId,
    })

    expect(member).toBe(null)
  })

  it('Should not be able to delete a members with wrong id and slug', async () => {
    await sutAdd.execute({
      organizationId: '12345',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId: randomUUID(),
    })

    await expect(
      sut.execute({
        slug: 'teste',
        userId: '12345',
      }),
    ).rejects.toThrowError('Member does not exist on this organization')
  })
})
