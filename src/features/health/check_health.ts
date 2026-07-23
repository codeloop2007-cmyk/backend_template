import { Router } from "express";

export const healthRoute = Router();

healthRoute.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});
