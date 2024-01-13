import { Express } from "@progue/express";
import http from "http";
import https from "https";
import { configureHttp } from "../http/configure-http";
import { logger } from "../utils/logger";


export async function cmdServer(app: Express): Promise<void> {
  const PORT = process.env.PORT ?? 5000;
  configureHttp();

  if (process.env.NODE_ENV !== "production") {
    http.createServer(app).listen(PORT, () => {
      logger.info(`App listening at http://localhost:${PORT}`);
    });
  } else {
    https.createServer(app).listen(PORT, () => {
      logger.info(`App on Prod`);
    });
  }
}
