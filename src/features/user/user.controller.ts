import {
  HttpErrorStatus,
  HttpSuccessStatus,
} from "../../shared/constants/http_status.js";
import { HttpError } from "../../shared/errors/http.error.js";
import type { HttpBody } from "../../shared/types/http.type.js";
import { getUserId } from "../../shared/utils/parse.userid.js";
import { syncUserRequestSchema } from "./user.request.js";
import type { UserSyncResponse } from "./user.response.js";
import { userService } from "./user.service.js";
import type { Request, Response } from "express";
export async function syncUserController(req: Request, res: Response) {
  const userId = getUserId(req);

  const validation = syncUserRequestSchema.safeParse({ userId });
  if (!validation.success) {
    throw new HttpError(HttpErrorStatus.BAD_REQUEST, validation.error.message);
  }

  await userService.syncUser({ userId });
  const resBody: HttpBody<UserSyncResponse> = {
    success: true,
    data: { userSync: true },
  };
  res.status(HttpSuccessStatus.OK).json(resBody);
}
