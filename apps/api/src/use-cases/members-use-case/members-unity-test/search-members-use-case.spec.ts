import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMembersRepository } from '@/repositories/In-memory-repository/in-memory-member-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { CreateOrganizationUseCase } from '@/use-cases/organization-use-case/create-organization-use-case'

import { AddMemberUseCase } from '../add-member-use-case'
import { SearchMembersUseCase } from '../search-members-use-case'

let membersRepository: InMemoryMembersRepository
let organizationRepository: InMemoryOrganizationsRepository
let sutOrg: CreateOrganizationUseCase
let sutAdd: AddMemberUseCase
let sut: SearchMembersUseCase

describe('Search a members on organization', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sutOrg = new CreateOrganizationUseCase(organizationRepository)
    sutAdd = new AddMemberUseCase(membersRepository)
    sut = new SearchMembersUseCase(membersRepository, organizationRepository)
  })

  it('Should be able to search a members on the organization with query', async () => {
    const { member } = await sutAdd.execute({
      organizationId: '12345',
      role: 'ADMIN',
      statusProfile: 'ACTIVE',
      slug: 'leadcode',
      userId: '12345',
    })

    const { organization } = await sutOrg.execute({
      name: 'Leadcode',
      userId: member.id,
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
    })

    const { members } = await sut.execute({
      domain: organization.domain!,
      slug: organization.slug!,
      query: 'carlos',
    })

    expect(members).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: '12345',
        }),
      ]),
    )
  })

  it('Should not be able to search a members with wrong query', async () => {
    await expect(
      sut.execute({
        domain: 'leadcode@gmail.com',
        slug: 'leadcode',
        query: 'Mateus',
      }),
    ).rejects.toThrowError('Organization not found')
  })
})
