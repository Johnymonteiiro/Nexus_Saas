import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createOrganization } from './create-organization'
import { GetMembershipOrganization } from './get-membership-organization'

export async function organizationRoutes(app: FastifyInstance) {
  app.get(
    '/organizations/:slug/memberships',
    { onRequest: [verifyJWT] },
    GetMembershipOrganization,
  )
  app.post('/organizations', { onRequest: [verifyJWT] }, createOrganization)
}
