import { AxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "../utils/logger";

// log Response on App
export function logResponse(res: AxiosResponse): AxiosResponse {
  logger.info(
    {
      status: res.status,
      method: res.config.method?.toUpperCase(),
      url: res.config.url,
    },
    "Response"
  );
  logger.debug(
    {
      status: res.status,
      method: res.config.method?.toUpperCase(),
      url: res.config.url,
      body: res.data,
    },
    "Response"
  );
  return res;
}

// log Request on App
export function logRequest(req: AxiosRequestConfig): AxiosRequestConfig {
  logger.debug(
    {
      method: req.method?.toUpperCase(),
      url: req.url,
      body: req.data,
    },
    "Request"
  );

  return req;
}
