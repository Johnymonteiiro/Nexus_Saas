import { Role, StatusProfile } from '@prisma/client'
import { z } from 'zod'

export const createOrganizationBodySchema = z.object({
  name: z.string(),
  // userId: z.string().uuid(),
  shouldAttachUsersByDomain: z.optional(z.boolean()),
  domain: z
    .string()
    .nullable()
    .refine((value) => value !== null, {
      message: 'Domain cannot be null',
    }),
})

// export const profileBodySchema = z.object({
//   description: z.optional(z.string()),
//   profession: z.optional(z.string()),
//   position: z.optional(z.string()),
//   phoneNumber: z.optional(z.string()),
//   imageUrl: z.optional(z.string().url()),
//   statusProfile: z.optional(z.nativeEnum(StatusProfile)),
//   role: z.optional(z.array(z.nativeEnum(Role))),
// })
export const membershipOrganizationParamsSchema = z.object({
  slug: z.string(),
  page: z.coerce.number(),
  memberId: z.string().uuid(),
})

export const deleteMembershipOrganizationParamsSchema = z.object({
  slug: z.string(),
  memberId: z.string().uuid(),
})

export const getMembershipOrganizationParamsSchema = z.object({
  slug: z.string(),
  page: z.coerce.number(),
})

export const searchMembershipOrganizationParamsSchema = z.object({
  slug: z.string(),
  query: z.string(),
})

export const addMembersBodySchema = z.object({
  statusProfile: z.nativeEnum(StatusProfile),
  role: z.nativeEnum(Role),
  slug: z.string(),
  userId: z.string().uuid(),
})

// export const userResetPasswordBodySchema = z.object({
//   password: z.string().min(6),
//   code: z.string().uuid(),
// })
