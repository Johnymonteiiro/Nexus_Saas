import { FastifyReply, FastifyRequest } from 'fastify'

import { githubClient } from '@/lib/github-connection'
import { githubUserResponseSchema } from '@/schema-validation/github/github-schema'
import { authenticateGithubBodySchema } from '@/schema-validation/user/user-schema'
import { MakeCreate0AuthUseCase } from '@/use-cases/factories/0auth-factory-function/make-create-0auth-factory'

export async function authenticateWithGithub(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { code } = authenticateGithubBodySchema.parse(request.body)

    const { githubUserData } = await githubClient(code)

    const {
      name,
      email,
      avatar_url: avatarUrl,
      id: githubId,
    } = githubUserResponseSchema.parse(githubUserData)

    const oAuthUserCase = MakeCreate0AuthUseCase()

    const { user } = await oAuthUserCase.execute({
      name,
      avatarUrl,
      githubId,
      email,
      provider: 'GITHUB',
    })

    const token = await reply.jwtSign(
      {}, // payload
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    reply.status(400).send({ message: 'Invalid access_token' })
  }
}
