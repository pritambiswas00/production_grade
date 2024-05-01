export class ServerError extends Error {
  public errorMessage: string;
  constructor(msg: string) {
    super();
    this.errorMessage = msg;
  }
}
