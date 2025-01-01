import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { OrganizationAlreadyExistError } from '@/use-cases/errors/organization-already-exist-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { CreateOrganizationUseCase } from '../create-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able create an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('create', 'Organization')).toBe(true)
  })

  it('Only user with ADMIN or MANAGER role should create an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'ADMIN',
    }

    const ability = getUserPermissions(user.userId, user.role)

    expect(ability.cannot('create', 'Organization')).toBe(false)
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
