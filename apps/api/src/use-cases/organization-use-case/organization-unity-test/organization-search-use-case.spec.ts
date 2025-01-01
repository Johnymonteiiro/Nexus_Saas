import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'

import { ArchiveOrganizationUseCase } from '../archive-organization-use-case'
import { SearchOrganizationUseCase } from '../search-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let org: ArchiveOrganizationUseCase
let sut: SearchOrganizationUseCase

describe('Search Organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new SearchOrganizationUseCase(organizationRepository)
    org = new ArchiveOrganizationUseCase(organizationRepository)
  })

  it('Should be able to search organization by query', async () => {
    await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
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
      query: 'Leadcode',
    })

    expect(organization).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'ACTIVE',
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
        query: 'Best',
      })
    }).rejects.toThrowError('Organization not found')
  })
})
