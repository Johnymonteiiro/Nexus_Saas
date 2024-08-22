export class MemberAlreadyExistError extends Error {
  constructor() {
    super('Member already exist on this organization')
  }
}
