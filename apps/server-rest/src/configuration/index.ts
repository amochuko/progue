import { Knex } from "knex";
import { Level } from "pino";
import { getConfig } from "./configs-env/get-config";

export type Environment = "test" | "production" | "local";
export const config = getConfig(process.env as unknown as ProcessVariables);

export interface Config {
  http: {
    servicesUrl: string;
    clientID: string;
    clientSecret: string;
  };
  env: Environment;
  logLevel: Level;
  database: Knex.PgConnectionConfig;
  authentication: {
    enabled: boolean;
    jwksUrl: string;
  };
}

export interface ProcessVariables {
  ENV?: Environment;
  LOG_LEVEL?: Level;
  JWKS_URL?: string;
  DATABASE_URL?: string;
  SERVICE_URL?: string;
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
}
