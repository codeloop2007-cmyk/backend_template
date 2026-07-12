import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../shared/errors/http.error.js";
import { HttpErrorStatus } from "../shared/constants/http_status.js";
import { verifyJwt } from "../shared/utils/jwt.services.js";
import { env } from "../configs/env.config.js";

export interface AuthUser {
  id: string;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpError(
      HttpErrorStatus.UNAUTHORIZED,
      "Authorization header missing",
    );
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new HttpError(
      HttpErrorStatus.UNAUTHORIZED,
      "Invalid authorization format",
    );
  }

  const payload = verifyJwt<AuthUser>(token, env.JWT_SECRET);

  req.user = {
    id: payload.id,
  };

  next();
}
