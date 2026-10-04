import { createServer } from "http";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { closeDatabase, connectToDatabase } from "./db/sequuelize.js";
import { initModels } from "./models/index.js";
import { createApp } from "./app.js";
import { closePublisher, initPublisher } from "./messaging/event-publishing.js";


const main = async () => {
  try {

    await connectToDatabase();
    await initModels();

    await initPublisher();

    const app = createApp();
    const server = createServer(app);

    const PORT = env.AUTH_SERVICE_PORT;

    server.listen(PORT, () => {
      logger.info(`Auth service is running on port: ${PORT}`)
    });

    const shutdown = () => {

      Promise.all([closeDatabase(),closePublisher()])
        .catch((error: unknown) => {
          logger.info("shutting down auth service...");

        })
        .finally(() => {
          server.close(() => process.exit(0));
        })
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  }
  catch (error) {
    logger.error({error}, "Failed to start Auth service")
}
}

main();
