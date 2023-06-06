import express from "express";
import config from "./config";
import logger from "./helpers/logger";
import pinoHTTP from 'pino-http';
import db from "./helpers/db";

const app = express();

app.use(express.json());

app.use(
  pinoHTTP({
    logger,
  })
);

app.listen(config.service.content.port, () => {
  logger.info(`Content service running on port ${config.service.content.port}`);

  db.catch((error) => {
    logger.error(error, 'Issue connecting to MongoDB');
  });
});
