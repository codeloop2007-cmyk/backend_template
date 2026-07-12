import type { Request, Response } from "express";

import { HttpError } from "../shared/errors/http.error.js";
import { HttpErrorStatus } from "../shared/constants/http_status.js";

export function notFoundMiddleware(_req: Request, _res: Response): void {
  throw new HttpError(HttpErrorStatus.NOT_FOUND, "User not found");
}
