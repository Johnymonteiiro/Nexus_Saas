import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '..'
import { User } from '../models/users'
import { Roles } from '../subjects/roles'

// Builder ==> tell the users what permition have
// AbilityBuilder ==> is generic and builder type
// AppAbility ==> let us know what hind of ability has got our app

type PermissiosByRoles = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissios: Record<Roles, PermissiosByRoles> = {
  ADMIN: (user, { can, cannot }) => {
    can('manage', 'all')
    cannot(['create', 'update'], 'Profile')
    can(['create', 'update'], 'Profile', {
      ownerId: { $eq: user.id },
    })

    cannot(['transfear_ownership', 'update'], 'Organization')
    can(['transfear_ownership', 'update', 'delete'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER: (user, { can }) => {
    can('get', 'User')

    can(['get', 'update'], 'Customer')
    can(['update', 'create'], 'Profile', {
      ownerId: { $eq: user.id },
    })

    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', {
      ownerId: { $eq: user.id },
    })
  },
  MANAGER: (user, { can, cannot }) => {
    can(['create', 'manage'], 'Organization')
    can(['get', 'update'], 'Customer')
    can('manage', 'User')

    can(['update', 'create'], 'Profile', {
      ownerId: { $eq: user.id },
    })
    can('manage', 'Project')
    can('manage', 'Invite')
    cannot(['transfear_ownership', 'update'], 'Organization')
    can(['transfear_ownership', 'update', 'delete'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  BILLING: (_, { can }) => {
    can('manage', 'Billing')
  },
  CUSTOMER: (user, { can }) => {
    can(['update', 'create'], 'Profile', {
      ownerId: { $eq: user.id },
    })
    can(['get', 'update'], 'Project', {
      ownerId: { $eq: user.id },
    })
  },
}
