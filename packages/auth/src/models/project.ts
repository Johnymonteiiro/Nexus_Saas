import { z } from 'zod'

export const projectSchema = z.object({
  // typename indica a qual projecto ou subject o nosso schema pertence
  __typename: z.literal('Project').default('Project'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type Project = z.infer<typeof projectSchema>
