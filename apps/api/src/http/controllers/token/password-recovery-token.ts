import { FastifyReply, FastifyRequest } from 'fastify'

import { userRecoveryPasswordBodySchema } from '@/schema-validation/user/user-schema'
import { MakeRecoveryPasswordTokenUseCase } from '@/use-cases/factories/token-factory-function/make-recovery-password-token-factory'

export async function passwordRecovery(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = userRecoveryPasswordBodySchema.parse(request.body)
  try {
    const recoveryPasswordTokenUseCase = MakeRecoveryPasswordTokenUseCase()
    const { user } = await recoveryPasswordTokenUseCase.execute({
      email,
      type: 'PASSWORD_RECOVERY',
    })

    if (!user) {
      // we don`t want people to know  if user really exists status 201
      return reply.status(201).send()
    }
  } catch (err) {
    if (err) {
      return reply.status(201).send()
    }

    throw err
  }
  return reply.status(201).send()
}
