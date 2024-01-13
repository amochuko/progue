import { Config, ProcessVariables } from "..";

export function getProductionConfig(processVar: ProcessVariables): Config {
  return {
    http: {
      clientID: "",
      clientSecret: "changes",
      servicesUrl:
        processVar.SERVICE_URL ??
        "<SERVICES_URL> needs to be set in production environment",
    },
    env: "production",
    logLevel: processVar.LOG_LEVEL ?? "info",
    authentication: {
      enabled: true,
      jwksUrl:
        processVar.JWKS_URL ??
        "<JWKS_URL> need to be set in production environment",
    },
    database: {
      connectionString: processVar.DATABASE_URL,
      ssl: true,
    },
  };
}
