import { FastifyInstance } from 'fastify'

import { passwordRecovery } from './password-recovery-token'
import { passwordReset } from './password-reset-token'

export async function tokenRoutes(app: FastifyInstance) {
  // recovery password route:
  app.post('/password/recovery', passwordRecovery)
  app.post('/password/reset', passwordReset)
}
