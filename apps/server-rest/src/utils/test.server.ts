import express, { Express } from "express";
import { sendErrorResponse } from "../middleware/error-handler/error";
import { validateInputs } from "../preflight-handlers/openapi";

// spin up Server for testing
export function testServer(configure: (express: Express) => void): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  // validate inputs before all controllers
  app.use(validateInputs);
  configure(app);

  // send an error response if an error occurred
  app.use(sendErrorResponse);
  return app;
}
