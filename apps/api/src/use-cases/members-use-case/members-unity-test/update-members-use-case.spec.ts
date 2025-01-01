import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { AddMemberUseCase } from '../add-member-use-case'
import { UpdateMemberUseCase } from '../update-member-use-case'

let membersRepository: InMemoryMembersRepository
let sut: UpdateMemberUseCase
let sutAdd: AddMemberUseCase

describe('Update members', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new UpdateMemberUseCase(membersRepository)
    sutAdd = new AddMemberUseCase(membersRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able add a member to an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('update', 'Member')).toBe(true)
  })

  it('Should be able to update a member to an organization', async () => {
    const { member } = await sutAdd.execute({
      organizationId: randomUUID(),
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId: randomUUID(),
    })
    const { member: newMember } = await sut.execute({
      role: 'MEMBER',
      statusProfile: 'ACTIVE',
      memberId: member.id,
      organizationId: member.organizationId,
      slug: 'leadcode',
      userId: member.userId,
    })

    expect(newMember.status_profile).toEqual('ACTIVE')
  })
})
