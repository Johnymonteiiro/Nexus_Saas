import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'

import { ArchiveOrganizationUseCase } from '../archive-organization-use-case'
import { SearchArchivedOrganizationUseCase } from '../search-archived-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let org: ArchiveOrganizationUseCase
let sut: SearchArchivedOrganizationUseCase

describe('Search Archived organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new SearchArchivedOrganizationUseCase(organizationRepository)
    org = new ArchiveOrganizationUseCase(organizationRepository)
  })

  it('Should be able to search archived organization by query', async () => {
    await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
      status: 'ACTIVE',
    })

    const { domain, id } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    await org.execute({ domain: domain!, organizationId: id })

    const { organization } = await sut.execute({
      query: 'Best',
    })

    expect(organization).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'ARCHIVED',
        }),
      ]),
    )
  })

  it('Should be able to show message when the organization was not found', async () => {
    const { domain, id } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    await org.execute({ domain: domain!, organizationId: id })

    expect(async () => {
      await sut.execute({
        query: 'Leadcode',
      })
    }).rejects.toThrowError('Organization not found')
  })
})
