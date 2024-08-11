import { FastifyReply, FastifyRequest } from 'fastify'

import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'
import { MakeGetProfileUserUseCase } from '@/use-cases/factories/users-factories/make-get-profile-user-factory'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProfile = MakeGetProfileUserUseCase()
    const { user } = await getProfile.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ ...user, passwordHash: undefined })
  } catch (err) {
    if (err instanceof UsersNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
