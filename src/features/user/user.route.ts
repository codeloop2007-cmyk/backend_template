import { Router } from "express";
import { syncUserController } from "./user.controller.js";

const userRouter = Router();
userRouter.post("/sync", syncUserController);

export default userRouter;
