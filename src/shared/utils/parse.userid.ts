import type { Request } from "express";
import { HttpErrorStatus } from "../constants/http_status.js";
import { HttpError } from "../errors/http.error.js";

export function getUserId(req: Request): string {
  if (!req.userId) {
    throw new HttpError(
      HttpErrorStatus.UNAUTHORIZED,
      "User is not authenticated",
    );
  }

  return req.userId;
}
