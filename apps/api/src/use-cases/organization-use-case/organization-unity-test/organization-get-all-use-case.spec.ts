import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'

import { ArchiveOrganizationUseCase } from '../archive-organization-use-case'
import { GetAllOrganizationUseCase } from '../get-all-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let org: ArchiveOrganizationUseCase
let sut: GetAllOrganizationUseCase

describe('Get all organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new GetAllOrganizationUseCase(organizationRepository)
    org = new ArchiveOrganizationUseCase(organizationRepository)
  })

  it('Should be able to get all organization', async () => {
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

    await organizationRepository.create({
      name: 'Teste',
      domain: 'teste@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'teste',
      ownerId: randomUUID(),
    })

    await org.execute({ domain: domain!, organizationId: id })

    const { organization } = await sut.execute({
      page: 1,
    })

    expect(organization).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'ACTIVE',
        }),
      ]),
    )
  })
})
