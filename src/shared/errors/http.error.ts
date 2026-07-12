import type { HttpErrorStatus } from "../constants/http_status.js";

export class HttpError extends Error {
  public readonly status: HttpErrorStatus;

  constructor(status: HttpErrorStatus, message: string) {
    super(message);

    this.name = "HttpError";
    this.status = status;

    // Maintains the correct stack trace (especially useful in Node.js)
    Error.captureStackTrace?.(this, HttpError);
  }
}
