import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'

import { ArchiveOrganizationUseCase } from '../archive-organization-use-case'
import { GetAllArchivedOrganizationUseCase } from '../get-all-archived-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let org: ArchiveOrganizationUseCase
let sut: GetAllArchivedOrganizationUseCase

describe('Get all Archived organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new GetAllArchivedOrganizationUseCase(organizationRepository)
    org = new ArchiveOrganizationUseCase(organizationRepository)
  })

  it('Should be able to get all archived organization', async () => {
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

    const { domain: domain2, id: id2 } = await organizationRepository.create({
      name: 'Teste',
      domain: 'teste@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'teste',
      ownerId: randomUUID(),
    })

    await org.execute({ domain: domain!, organizationId: id })
    await org.execute({ domain: domain2!, organizationId: id2 })

    const { organization } = await sut.execute({
      page: 1,
    })

    expect(organization).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'ARCHIVED',
        }),
      ]),
    )
  })
})
