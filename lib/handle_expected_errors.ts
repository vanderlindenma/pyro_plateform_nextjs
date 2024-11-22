export class ExpectedError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ExpectedError.prototype);
  }
}
