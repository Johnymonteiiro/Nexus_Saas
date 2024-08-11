export class InvalidCredentialError extends Error {
  constructor() {
    super('Invalid credentials')
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super('User does not have a password, use a social login')
  }
}
