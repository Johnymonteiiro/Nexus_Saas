import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

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

  it('User with no ADMIN or MANAGER role should not be able delete a member to an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('delete', 'Member')).toBe(true)
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
      memberId: newMember.id,
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
        memberId: '12345',
      }),
    ).rejects.toThrowError('Member does not exist on this organization')
  })
})
