import { z } from 'zod'

import { rolesSchema } from '../subjects/roles'

export const userSchema = z.object({
  role: rolesSchema,
  id: z.string().uuid(),
})

export type User = z.infer<typeof userSchema>
