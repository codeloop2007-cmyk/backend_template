import app from "./app.js";
import { env } from "./configs/env.config.js";

function startServer() {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

startServer();
