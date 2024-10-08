import { z } from 'zod'

export const rolesSchema = z.union([
  z.literal('ADMIN'),
  z.literal('MEMBER'),
  z.literal('MANAGER'),
  z.literal('CUSTOMER'),
  z.literal('BILLING'),
])

export type Roles = z.infer<typeof rolesSchema>
