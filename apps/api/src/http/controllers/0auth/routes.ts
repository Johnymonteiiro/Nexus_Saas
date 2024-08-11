import { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './authenticate-with-github'

export async function OauthRoutes(app: FastifyInstance) {
  app.post('/session/github', authenticateWithGithub)
}
