export class ExpectedError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ExpectedError.prototype);
  }
}

export const tryCatchExpectedError = async <T, U>(
  fn: () => Promise<T>,
  return_if_expected_error: U
): Promise<T | U> => {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ExpectedError) {
      console.log("Caught expected error:", err.message);
      return return_if_expected_error;
    }
    throw err;
  }
};
