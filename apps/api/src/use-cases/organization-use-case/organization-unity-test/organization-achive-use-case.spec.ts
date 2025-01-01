import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { ArchiveOrganizationUseCase } from '../archive-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: ArchiveOrganizationUseCase

describe('Archive organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new ArchiveOrganizationUseCase(organizationRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able archive an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('update', 'Organization')).toBe(true)
  })

  it('Only user with ADMIN or MANAGER role should archive an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'ADMIN',
    }

    const ability = getUserPermissions(user.userId, user.role)

    expect(ability.cannot('update', 'Organization')).toBe(false)
  })

  it('Should be able to archive an organization', async () => {
    const { domain, id } = await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
      status: 'ACTIVE',
    })

    const { organization } = await sut.execute({
      domain: domain!,
      organizationId: id,
    })

    expect(organization?.status).toEqual('ARCHIVED')
  })

  it('Should not be able to archive an organization with wrong domain', async () => {
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
