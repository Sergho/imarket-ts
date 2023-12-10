import { ErrorType, ErrorResponse } from "./types";

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;

  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string
  ) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorMessage: this.message,
      errorType: this.errorType
    };
  }
}
