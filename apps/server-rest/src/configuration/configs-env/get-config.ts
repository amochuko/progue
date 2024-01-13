import { Config, Environment, ProcessVariables } from "..";
import { getLocalConfig } from "./get-local-config";
import { getProductionConfig } from "./get-production-config";
import { getTestConfig } from "./get-test.config";

export function getConfig(processVar: ProcessVariables): Config {
  const env: Environment = processVar.ENV || "local";

  switch (env) {
    case "production":
      return getProductionConfig(processVar);
    case "local":
      return getLocalConfig(processVar);
    case "test":
      return getTestConfig(processVar);
  }
}
