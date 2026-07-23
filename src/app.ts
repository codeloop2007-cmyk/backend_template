import express from "express";
import { errorMiddleware } from "./middlewares/error_handler.middleware.js";
import { invalidRouteMiddleware } from "./middlewares/not_found.middleware.js";
import { healthRoute } from "./features/health/check_health.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.use(healthRoute);

////
// throw if no route
app.use(invalidRouteMiddleware);
// Error handler MUST be last
app.use(errorMiddleware);

export default app;
