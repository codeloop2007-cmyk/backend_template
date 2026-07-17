import type { NextFunction, Request, Response } from "express";
import z from "zod";

import { env } from "../configs/env.config.js";
import { HttpErrorStatus } from "../shared/constants/http_status.js";
import { HttpError } from "../shared/errors/http.error.js";
import { verifyJwt } from "../shared/utils/jwt.util.js";

export interface JwtPayload {
  id: string;
}

const authMiddlewareRequestSchema = z.object({
  headers: z.object({
    authorization: z.string().startsWith("Bearer "),
  }),
});

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const result = authMiddlewareRequestSchema.safeParse(req);

  if (!result.success) {
    throw new HttpError(
      HttpErrorStatus.UNAUTHORIZED,
      "Authorization header is invalid",
    );
  }

  const token = result.data.headers.authorization.split(" ")[1];

  try {
    const payload = verifyJwt<JwtPayload>(token!, env.JWT_SECRET);

    req.userId = payload.id;

    next();
  } catch {
    throw new HttpError(
      HttpErrorStatus.UNAUTHORIZED,
      "Invalid or expired token",
    );
  }
}
