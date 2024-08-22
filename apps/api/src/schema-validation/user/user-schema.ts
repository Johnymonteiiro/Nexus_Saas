import { Role } from '@prisma/client'
import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  globalRole: z.nativeEnum(Role),
})

export const profileBodySchema = z.object({
  description: z.optional(z.string()),
  profession: z.optional(z.string()),
  position: z.optional(z.string()),
  phoneNumber: z.optional(z.string()),
  imageUrl: z.optional(z.string().url()),
  globalRole: z.nativeEnum(Role),
})
export const profileUserParamsSchema = z.object({
  userId: z.string().uuid(),
})

export const userAuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticateGithubBodySchema = z.object({
  code: z.string(),
})

export const userRecoveryPasswordBodySchema = z.object({
  email: z.string().email(),
})

export const userResetPasswordBodySchema = z.object({
  password: z.string().min(6),
  code: z.string().uuid(),
})
