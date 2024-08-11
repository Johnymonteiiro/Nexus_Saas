import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { AppAbilitiesSchema } from './abilitySchema'
import { User } from './models/users'
import { permissios } from './permissions/permissions'

export type AppAbility = MongoAbility<AppAbilitiesSchema>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityfor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissios[user.role] !== 'function') {
    throw new Error(`Permission for role ${user.role} not found`)
  }

  permissios[user.role](user, builder)

  const ability = builder.build({
    // deteta qual a subject do schema na pasta models
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  return ability
}
