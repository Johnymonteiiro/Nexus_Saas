import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { addMemberShipOrganization } from './add-membership-organization'
import { createOrganization } from './create-organization'
import { DeleteMembershipOrganization } from './delete-membership-organization'
import { GetMembershipOrganization } from './get-membership-organization'
import { SearchMembershipOrganization } from './search-membership-organization'

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
  app.post(
    '/organizations/add/memberships',
    { onRequest: [verifyJWT] },
    addMemberShipOrganization,
  )
  app.post('/organizations', { onRequest: [verifyJWT] }, createOrganization)
}
