import { z } from 'zod'

export const queryBodyShema = z.object({
  query: z.string(),
  page: z.coerce.number(),
})
