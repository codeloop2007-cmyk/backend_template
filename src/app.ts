import express from "express";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { errorMiddleware } from "./middlewares/error_handler.middleware.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TrainX Backend is running",
  });
});

app.use(authMiddleware);
////

// Error handler MUST be last
app.use(errorMiddleware);

export default app;
