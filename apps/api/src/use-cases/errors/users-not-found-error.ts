export class UsersNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}
