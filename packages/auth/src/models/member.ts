import { z } from 'zod'

export const memberSchema = z.object({
  // typename indica a qual projecto ou subject o nosso schema pertence
  __typename: z.literal('Member').default('Member'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type Member = z.infer<typeof memberSchema>
