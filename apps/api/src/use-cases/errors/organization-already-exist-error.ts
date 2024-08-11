export class OrganizationAlreadyExistError extends Error {
  constructor() {
    super('Organization with same domain')
  }
}
