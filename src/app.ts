import express from "express";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { errorMiddleware } from "./middlewares/error_handler.middleware.js";
import { notFoundMiddleware } from "./middlewares/not_found.middleware.js";
import { userRoute } from "./features/user/user.router.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TrainX Backend is running",
  });
});

app.use(authMiddleware);
////
app.use("/user", userRoute);
// throw if no route
app.use(notFoundMiddleware);
// Error handler MUST be last
app.use(errorMiddleware);

export default app;
