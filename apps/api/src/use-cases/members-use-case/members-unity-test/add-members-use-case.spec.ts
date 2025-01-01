import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { AddMemberUseCase } from '../add-member-use-case'

let membersRepository: InMemoryMembersRepository
let sut: AddMemberUseCase

describe('Create members', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new AddMemberUseCase(membersRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able add a member to an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('create', 'Member')).toBe(true)
  })

  it('Should be able to add a member to an organization', async () => {
    const { member } = await sut.execute({
      organizationId: 'organizationId',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId: 'userId',
    })

    expect(member.organizationId).toEqual('organizationId')
  })
  it('Should not be able to add a member with the same Id', async () => {
    const userId = 'userId'
    await sut.execute({
      organizationId: 'organizationId',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId,
    })

    await expect(
      sut.execute({
        organizationId: 'organizationId',
        role: 'ADMIN',
        statusProfile: 'ACTIVE',
        slug: 'leadcode',
        userId,
      }),
    ).rejects.toThrowError('Member already exist on this organization')
  })
})
