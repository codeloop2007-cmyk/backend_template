import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/errors/http.error.js";
import { HttpErrorStatus } from "../shared/constants/http_status.js";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  const getError = () => {
    if (error instanceof HttpError) {
      return error;
    } else {
      return new HttpError(
        HttpErrorStatus.INTERNAL_SERVER_ERROR,
        "internal server error",
      );
    }
  };

  const body = {
    success: false,
    error: getError().message,
  };
  return res.status(getError().status).json(body);
}
