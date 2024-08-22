import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { CreateOrganizationUseCase } from '@/use-cases/organization-use-case/create-organization-use-case'

import { AddMemberUseCase } from '../add-member-use-case'
import { GetMembersUseCase } from '../get-members-use-case'

let membersRepository: InMemoryMembersRepository
let organizationRepository: InMemoryOrganizationsRepository
let sutOrg: CreateOrganizationUseCase
let sut: GetMembersUseCase
let sutAdd: AddMemberUseCase

describe('List all members', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new GetMembersUseCase(membersRepository, organizationRepository)
    sutOrg = new CreateOrganizationUseCase(organizationRepository)
    sutAdd = new AddMemberUseCase(membersRepository)
  })

  it('Should be able to list all members on the organization', async () => {
    const { organization } = await sutOrg.execute({
      name: 'Leadcode',
      userId: randomUUID(),
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
    })

    await sutAdd.execute({
      organizationId: '12345',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: organization.slug,
      userId: organization.ownerId,
    })

    const { members } = await sut.execute({
      page: 1,
      domain: organization.domain!,
      slug: organization.slug,
    })

    expect(members).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          organizationId: '12345',
        }),
      ]),
    )
  })

  it('Should not be able to List members with wrong slug', async () => {
    const { organization } = await sutOrg.execute({
      name: 'Leadcode',
      userId: randomUUID(),
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
    })

    const { members } = await sut.execute({
      page: 1,
      domain: organization.domain!,
      slug: 'somethingCrazy',
    })

    expect(members).toEqual(expect.arrayContaining([]))
  })
})
