export class CustomError<T extends object = any> extends Error {
  constructor(
    public message: string,
    public customData: T,
    cause?: Error,
  ) {
    super(message, { cause });
  }
}
