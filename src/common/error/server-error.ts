// Usage: `throw new ServerError(501, "Feature not implemented", {
// sampleData: "sampleData" })`
export class ServerError<T extends object = any> extends Error {
  constructor(
    public status: number,
    public message: string,
    public responseData?: T,
  ) {
    super(message);
  }
}
