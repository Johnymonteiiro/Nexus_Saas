import { z } from 'zod'

import { customerSchema } from '../models/customer'

export const customerSubject = z.tuple([
  z.union([
    z.literal('read'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('create'),
    z.literal('get'),
  ]),
  z.union([z.literal('Customer'), customerSchema]),
])

export type CustomerSubject = z.infer<typeof customerSubject>
