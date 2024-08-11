import { FastifyReply, FastifyRequest } from 'fastify'

import { profileUserParamsSchema } from '@/schema-validation/user/user-schema'
import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'
import { MakeDeleteUserUseCase } from '@/use-cases/factories/users-factories/make-delete-user-factory'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = profileUserParamsSchema.parse(request.params)

  try {
    const deleteUserUseCase = MakeDeleteUserUseCase()
    await deleteUserUseCase.execute({
      userId,
    })

    return reply.status(201).send({ message: 'User delete sucess!' })
  } catch (err) {
    if (err instanceof UsersNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
