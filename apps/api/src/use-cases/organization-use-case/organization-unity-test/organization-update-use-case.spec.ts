import { organizationSchema } from '@nexus/auth'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/In-memory-repository/in-memory-organization-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UpdateOrganizationUseCase } from '../update-organization-use-case'

let organizationRepository: InMemoryOrganizationsRepository
let sut: UpdateOrganizationUseCase

describe('Update organizations', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new UpdateOrganizationUseCase(organizationRepository)
  })

  it('User with no ADMIN or MANAGER role should not be able update an organization', async () => {
    const user = {
      userId: randomUUID(),
      role: 'MEMBER',
    }

    const ability = getUserPermissions(user.userId, user.role)
    const organizationAuth = organizationSchema.parse({
      id: randomUUID(),
      ownerId: user.userId,
    })
    expect(ability.cannot('update', organizationAuth)).toBe(true)
  })

  it('Only user with ADMIN or MANAGER role should update an organization', async () => {
    const { id, ownerId } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    const user = {
      userId: ownerId,
      role: 'ADMIN',
    }
    const ability = getUserPermissions(user.userId, user.role)

    const organizationAuth = organizationSchema.parse({
      id,
      ownerId: user.userId,
    })

    expect(ability.cannot('update', organizationAuth)).toBe(false)
  })

  it('User can not update an organization that he is not the the owner', async () => {
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
    expect(ability.cannot('update', organizationAuth)).toBe(true)
  })

  it('User must update an organization that he is the owner', async () => {
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
    expect(ability.cannot('update', organizationAuth)).toBe(false)
  })

  it('Should be able to update an organization', async () => {
    const { id } = await organizationRepository.create({
      name: 'Best',
      domain: 'best@acm.com',
      shouldAttachUsersByDomain: true,
      slug: 'best',
      ownerId: randomUUID(),
    })

    const { organization } = await sut.execute({
      organizationId: id,
      name: 'Leadcode',
      description: 'Leadcode',
      imageUrl: 'testeUrl',
      shouldAttachUsersByDomain: false,
    })

    expect(organization.description!).toEqual('Leadcode')
  })
})
