import { FastifyReply, FastifyRequest } from 'fastify'

import { userResetPasswordBodySchema } from '@/schema-validation/user/user-schema'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeResetPasswordTokenUseCase } from '@/use-cases/factories/token-factory-function/make-reset-password-token-factory'

export async function passwordReset(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password, code } = userResetPasswordBodySchema.parse(request.body)
  try {
    const resetPasswordTokenUseCase = MakeResetPasswordTokenUseCase()
    const { user } = await resetPasswordTokenUseCase.execute({
      password,
      userId: code,
    })

    if (!user) {
      // we don`t want people to know  if user really exists status 201
      return reply.status(201).send()
    }
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
