export class NoResourceError extends Error {
  constructor() {
    super('No resource found')
  }
}
