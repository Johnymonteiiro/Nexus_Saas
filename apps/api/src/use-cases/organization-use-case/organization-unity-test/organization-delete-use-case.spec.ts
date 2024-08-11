import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'

import { DeleteOrganizationUseCase } from '../delete-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: DeleteOrganizationUseCase

describe('Delete organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new DeleteOrganizationUseCase(organizationRepository)
  })

  it('Should be able to delete an organization', async () => {
    const { domain, id } = await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
    })

    const { organization } = await sut.execute({
      domain: domain || '',
      organizationId: id,
    })

    expect(organization).toEqual(null)
  })

  it('Should not be able to delete an organization with wrong domain', async () => {
    const { id } = await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
    })

    expect(async () => {
      await sut.execute({
        domain: 'teste@com',
        organizationId: id,
      })
    }).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
