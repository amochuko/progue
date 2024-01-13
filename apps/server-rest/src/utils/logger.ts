import expressPino from "express-pino-logger";
import pino from "pino";
import { config } from "../configuration";

export const logger = pino({
  level: config.logLevel,
});
