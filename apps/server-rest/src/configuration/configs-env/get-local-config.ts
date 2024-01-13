import { Config, ProcessVariables } from "..";

export function getLocalConfig(processVar: ProcessVariables): Config {
  return {
    http: {
      clientID: "",
      clientSecret: "changeHere",
      servicesUrl: "http://localhost:3001", // spin up a server that responds with mock responses
    },
    env: "local",
    logLevel: processVar.LOG_LEVEL ?? "debug",
    authentication: {
      enabled: false,
      jwksUrl: "",
    },
    database: {
      // connectionString: processVar.DATABASE_URL,
      ssl: false,
      database: "postgres",
      port: 5432,
      password: "secret",
      user: "postgres",
      host: "localhost",
    },
  };
}
