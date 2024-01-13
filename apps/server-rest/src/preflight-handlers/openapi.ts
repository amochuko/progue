import * as OpenApiValidator from "express-openapi-validator";
import path from "path";

// TODO: use Swagger UI to validate

export const openApiSpec = path.join("./assets", "openapi.json");

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: openApiSpec,
  validateRequests: true,
  validateResponses: process.env.NODE_ENV !== "production" && true,
});
