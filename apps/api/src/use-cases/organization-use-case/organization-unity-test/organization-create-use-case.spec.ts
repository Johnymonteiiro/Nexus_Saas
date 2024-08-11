import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { OrganizationAlreadyExistError } from '@/use-cases/errors/organization-already-exist-error'

import { CreateOrganizationUseCase } from '../create-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('Should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      name: 'Leadcode',
      userId: randomUUID(),
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
    })

    expect(organization.domain).toEqual('leadcode@acm.com')
  })
  it('Should not be able to create an organization with the same domain', async () => {
    const domain = 'leadcode@acm.com'
    await sut.execute({
      name: 'Leadcode',
      userId: randomUUID(),
      domain,
      shouldAttachUsersByDomain: true,
    })

    await expect(
      sut.execute({
        name: 'Leadcode',
        userId: randomUUID(),
        domain,
        shouldAttachUsersByDomain: true,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistError)
  })
})
