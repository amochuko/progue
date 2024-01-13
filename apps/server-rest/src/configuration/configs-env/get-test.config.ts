import fs from "fs";
import os from "os";
import path from "path";
import { Config, ProcessVariables } from "..";
import Constant from "../../constant";

function readDatabasePort(): number | undefined {
  const varDir = path.join(os.tmpdir(), Constant.OsTempTestDir);
  const port = fs.readFileSync(path.join(varDir, Constant.DBPort), "utf-8");

  return port ? parseInt(port) : undefined;
}

export function getTestConfig(processVar: ProcessVariables): Config {
  return {
    http: {
      clientID: "",
      clientSecret: "",
      servicesUrl:
        processVar.SERVICE_URL ??
        "<SERVICES_URL> needs to be set in production environment",
    },
    env: "test",
    logLevel: processVar.LOG_LEVEL ?? "info",
    authentication: {
      enabled: false,
      jwksUrl: "<jwkUrl> is not set in a test environment",
    },
    database: {
      user: "postgres",
      host: "localhost",
      database: "postgres",
      port: readDatabasePort(),
      password: "secret",
      ssl: false,
    },
  };
}
