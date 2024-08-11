import { z } from 'zod'

export const profileSchema = z.object({
  // typename indica a qual projecto ou subject o nosso schema pertence
  __typename: z.literal('Profile').default('Profile'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type Profile = z.infer<typeof profileSchema>
