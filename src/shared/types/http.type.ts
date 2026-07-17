import type { HttpError } from "../errors/http.error.js";

export type HttpBody<T> =
  | {
      success: true;
      data: T;
    }
  | { success: false; error: HttpError };
