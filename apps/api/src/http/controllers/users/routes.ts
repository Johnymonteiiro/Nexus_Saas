import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createUser } from './create-user'
import { deleteUser } from './delete-user'
import { getUserProfile } from './get-user-profile'
import { seacrhUsers } from './search-users'
import { updateUser } from './update-user'
import { userAuthenticate } from './user-authenticate'

export async function userRoutes(app: FastifyInstance) {
  // create route
  app.post('/users', createUser)

  // login:
  app.post('/sessions', userAuthenticate)

  // Authenticate routes
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
  app.get(
    '/users/search/:query/page/:page',
    { onRequest: [verifyJWT] },
    seacrhUsers,
  )
  app.put('/me/update/:userId', { onRequest: [verifyJWT] }, updateUser)
  app.delete('/user/delete/:userId', { onRequest: [verifyJWT] }, deleteUser)
}
