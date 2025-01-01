import { Role, StatusProfile } from '@prisma/client'
import { z } from 'zod'

export const createOrganizationBodySchema = z.object({
  name: z.string(),
  shouldAttachUsersByDomain: z.optional(z.boolean()),
  domain: z
    .string()
    .nullable()
    .refine((value) => value !== null, {
      message: 'Domain cannot be null',
    }),
})

export const UpdateOrganizationBodySchema = z.object({
  organizationId: z.string().uuid(),
  description: z.optional(z.string()),
  name: z.optional(z.string()),
  domain: z
    .string()
    .nullable()
    .refine((value) => value !== null, {
      message: 'Domain cannot be null',
    }),
  shouldAttachUsersByDomain: z.optional(z.boolean()),
  imageUrl: z.optional(z.string().url()),
})

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

export const UpdateOrganizationParamSchema = z.object({
  slug: z.string(),
})
