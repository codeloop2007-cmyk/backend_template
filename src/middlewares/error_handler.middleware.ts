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

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
  });
}
