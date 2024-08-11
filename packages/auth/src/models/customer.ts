import { z } from 'zod'

import { rolesSchema } from '../subjects/roles'

export const customerSchema = z.object({
  // typename indica a qual projecto ou subject o nosso schema pertence
  __typename: z.literal('Customer').default('Customer'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  role: rolesSchema,
})

export type Cutomer = z.infer<typeof customerSchema>
