import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { CreateOrganization } from './create-organization'
import { AddMemberShipOrganization } from './memberships/add-membership-organization'
import { DeleteMembershipOrganization } from './memberships/delete-membership-organization'
import { GetMembershipOrganization } from './memberships/get-membership-organization'
import { SearchMembershipOrganization } from './memberships/search-membership-organization'
import { UpdateOrganization } from './update-organization'

export async function organizationRoutes(app: FastifyInstance) {
  app.get(
    '/organizations/:slug/:page/memberships',
    { onRequest: [verifyJWT] },
    GetMembershipOrganization,
  )
  app.get(
    '/organizations/:slug/search/:query/memberships',
    { onRequest: [verifyJWT] },
    SearchMembershipOrganization,
  )
  app.delete(
    '/organizations/:slug/memberships/:memberId',
    { onRequest: [verifyJWT] },
    DeleteMembershipOrganization,
  )
  app.put(
    '/organizations/:slug',
    { onRequest: [verifyJWT] },
    UpdateOrganization,
  )
  app.post(
    '/organizations/add/memberships',
    { onRequest: [verifyJWT] },
    AddMemberShipOrganization,
  )
  app.post('/organizations', { onRequest: [verifyJWT] }, CreateOrganization)
}
