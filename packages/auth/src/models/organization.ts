import { z } from 'zod'

export const organizationSchema = z.object({
  // typename indica a qual projecto ou subject o nosso schema pertence
  __typename: z.literal('Organization').default('Organization'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type Organization = z.infer<typeof organizationSchema>
