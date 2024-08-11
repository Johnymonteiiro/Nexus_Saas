import { FastifyReply, FastifyRequest } from 'fastify'

import { queryBodyShema } from '@/schema-validation/querySchema'
import { NoResourceError } from '@/use-cases/errors/no-resource-found-error'
import { MakeSearchManyUserUseCase } from '@/use-cases/factories/users-factories/make-searchMany-user-factory'

export async function seacrhUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, query } = queryBodyShema.parse(request.params)

  console.log('Page', page, 'Query', query)

  try {
    const searchManyUserUseCase = MakeSearchManyUserUseCase()
    const users = await searchManyUserUseCase.execute({
      query,
      page,
    })

    return reply.status(201).send(users)
  } catch (err) {
    if (err instanceof NoResourceError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
