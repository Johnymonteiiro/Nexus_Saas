import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { OauthRoutes } from '@/http/controllers/0auth/routes'
import { organizationRoutes } from '@/http/controllers/organization/routes'
import { tokenRoutes } from '@/http/controllers/token/routes'

import { env } from '../env'
import { userRoutes } from '../http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(tokenRoutes)
app.register(OauthRoutes)
app.register(organizationRoutes)

// Global error handlers

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO with DataLog or NewRelic
  }

  return reply.status(500).send({ message: 'Internal error server' })
})
