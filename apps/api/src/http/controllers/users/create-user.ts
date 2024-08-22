import { FastifyReply, FastifyRequest } from 'fastify'

import { createUserBodySchema } from '@/schema-validation/user/user-schema'
import { UserAlreadyExistError } from '@/use-cases/errors/user-already-exist-error'
import { MakeCreateUserUseCase } from '@/use-cases/factories/users-factories/make-create-user-factory'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, name, globalRole } = createUserBodySchema.parse(
    request.body,
  )

  try {
    const createUserUseCase = MakeCreateUserUseCase()
    await createUserUseCase.execute({ email, password, name, globalRole }) // executing the methods of users use-case
    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
