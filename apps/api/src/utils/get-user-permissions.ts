import { defineAbilityfor, userSchema } from '@nexus/auth'

export const getUserPermissions = (userId: string, role: string) => {
  const userAuth = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityfor(userAuth)

  return ability
}
