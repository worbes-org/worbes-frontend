export function assert(
  condition: unknown,
  message: Error | Response | string = "Assertion failed",
): asserts condition {
  if (condition) {
    return;
  }

  if (message instanceof Error || message instanceof Response) {
    throw message;
  }

  throw new AssertionError(message);
}

export class AssertionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AssertionError";
  }
}
