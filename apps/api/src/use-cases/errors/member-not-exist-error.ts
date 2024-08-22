export class MemberNotExistError extends Error {
  constructor() {
    super('Member does not exist on this organization')
  }
}
