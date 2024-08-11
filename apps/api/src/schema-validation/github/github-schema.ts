import { z } from 'zod'

export const githubAccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
})

export const githubUserResponseSchema = z.object({
  id: z.number().int().transform(String),
  name: z.string(),
  avatar_url: z.string().url(),
  email: z.string().nullable(),
})
