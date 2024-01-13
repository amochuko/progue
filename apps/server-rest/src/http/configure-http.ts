import axios from "axios";
import { attachAuthorization } from "./authorization-header.interceptor";
import { createHttpAgent, createHttpsAgent } from "./create-http-agents";
import { logRequest, logResponse } from "./log.interceptor";

export function configureHttp(): void {
  // configure axios to maximize available connection pool on host machine
  axios.defaults.httpAgent = createHttpAgent();
  axios.defaults.httpsAgent = createHttpsAgent();

  axios.interceptors.response.use(logResponse);
  axios.interceptors.request.use(logRequest);

  axios.interceptors.response.use(attachAuthorization);
}
