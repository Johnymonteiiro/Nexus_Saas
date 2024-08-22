import { FastifyReply, FastifyRequest } from 'fastify'

import {
  profileBodySchema,
  profileUserParamsSchema,
} from '@/schema-validation/user/user-schema'
import { UsersNotFoundError } from '@/use-cases/errors/users-not-found-error'
import { MakeUpdateUserUseCase } from '@/use-cases/factories/users-factories/make-update-user-factory'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = profileUserParamsSchema.parse(request.params)
  const {
    description,
    imageUrl,
    globalRole,
    phoneNumber,
    position,
    profession,
  } = profileBodySchema.parse(request.body)

  try {
    const updateUserUseCase = MakeUpdateUserUseCase()
    await updateUserUseCase.execute({
      userId,
      description,
      imageUrl,
      phoneNumber,
      position,
      profession,
      globalRole,
    })

    return reply.status(201).send({ message: 'User updated sucess!' })
  } catch (err) {
    if (err instanceof UsersNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
