import { organizationSchema } from '@nexus/auth'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { DeleteOrganizationUseCase } from '../delete-organization-use-case'
import { GetOrganizationUseCase } from '../get-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: DeleteOrganizationUseCase
let org: GetOrganizationUseCase

describe('Delete organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new DeleteOrganizationUseCase(organizationRepository)
    org = new GetOrganizationUseCase(organizationRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able delete an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    expect(ability.cannot('delete', 'Organization')).toBe(true)
  })

  it('Only user with ADMIN or MANAGER role should delete an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'ADMIN',
    }

    const ability = getUserPermissions(user.userId, user.role)

    expect(ability.cannot('delete', 'Organization')).toBe(false)
  })

  it('User can not delete an organization that he is not the the owner', async () => {
    const { id, ownerId } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    const user = {
      userId: ownerId,
      role: 'MANAGER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    const organizationAuth = organizationSchema.parse({
      id,
      ownerId: randomUUID(),
    })
    expect(ability.cannot('delete', organizationAuth)).toBe(true)
  })

  it('User must delete an organization that he is the owner', async () => {
    const { id, ownerId } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    const user = {
      userId: ownerId,
      role: 'MANAGER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    const organizationAuth = organizationSchema.parse({
      id,
      ownerId,
    })
    expect(ability.cannot('delete', organizationAuth)).toBe(false)
  })

  it('Should not be able to delete an organization with ACTIVE status', async () => {
    const { slug } = await organizationRepository.create({
      name: 'Leadcode',
      domain: 'leadcode@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'Leadcode',
      ownerId: randomUUID(),
      status: 'ACTIVE',
    })

    const { organization } = await org.execute({
      slug,
    })

    expect(async () => {
      await sut.execute({
        domain: organization?.domain ? organization?.domain : '',
        organizationId: organization?.id ? organization?.id : '',
      })
    }).rejects.toThrowError('This organization is not Archived')
  })

  it('Should be able to delete an organization with ARCHIVED status', async () => {
    const { id } = await organizationRepository.create({
      name: 'Teste',
      domain: 'teste@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'teste',
      ownerId: randomUUID(),
      status: 'ARCHIVED',
    })

    const organization =
      await organizationRepository.archiveOrganizationById(id)

    if (!organization) {
      return null
    }

    const { organization: findOrg } = await org.execute({
      slug: organization.id ? organization.slug : '',
    })

    const { organization: deleteOrg } = await sut.execute({
      domain: findOrg?.domain ? findOrg?.domain : '',
      organizationId: findOrg?.id ? findOrg?.id : '',
    })

    expect(deleteOrg).toBe(null)
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
