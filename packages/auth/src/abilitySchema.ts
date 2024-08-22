import { z } from 'zod'

import { billingSubject } from './subjects/billing'
import { customerSubject } from './subjects/customer'
import { inviteSubject } from './subjects/invite'
import { memberSubject } from './subjects/member'
import { organizationSubject } from './subjects/organizations'
import { profileSubject } from './subjects/profile'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

export * from './models/customer'
export * from './models/member'
export * from './models/organization'
export * from './models/profile'
export * from './models/project'
export * from './models/users'

export const appAbilitiesSchema = z.union([
  projectSubject,
  billingSubject,
  customerSubject,
  userSubject,
  profileSubject,
  inviteSubject,
  organizationSubject,
  memberSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])

export type AppAbilitiesSchema = z.infer<typeof appAbilitiesSchema>
