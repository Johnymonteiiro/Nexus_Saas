import { z } from 'zod'

import { profileSchema } from '../models/profile'

export const profileSubject = z.tuple([
  z.union([z.literal('create'), z.literal('read'), z.literal('update')]),
  z.union([z.literal('Profile'), profileSchema]),
])

export type ProfileSubject = z.infer<typeof profileSubject>
