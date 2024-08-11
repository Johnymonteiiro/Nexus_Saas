import { FastifyReply, FastifyRequest } from 'fastify'

import { userAuthenticateBodySchema } from '@/schema-validation/user/user-schema'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateUserUseCase } from '@/use-cases/factories/users-factories/make-authenticate-user-factory'

export async function userAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = userAuthenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = MakeAuthenticateUserUseCase()
    const { user } = await authenticateUserUseCase.execute({ email, password }) // executing the methods of users use-case

    const token = await reply.jwtSign(
      {}, // payload
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
