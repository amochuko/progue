import { AxiosRequestConfig, AxiosResponse } from "axios";
import { logRequest, logResponse } from "../log.interceptor";

jest.mock("../../utils/logger");
let logger: any;

beforeEach(() => {
  logger = require("../../utils/logger").logger;
});

describe("logging responses", () => {
  it("should log a concise info and more debug info", () => {
    logResponse({
      status: 200,
      data: { some: "response" },
      config: {
        data: { some: "request" },
        method: "get",
        url: "http://example.com",
      },
    } as AxiosResponse);

    expect(logger.error).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      {
        status: 200,
        method: "GET",
        url: "http://example.com",
      },
      "Response"
    );
    expect(logger.debug).toHaveBeenCalledWith(
      {
        status: 200,
        method: "GET",
        url: "http://some.org/api",
        body: {
          some: "response",
        },
      },
      "Response Details"
    );
  });
});

describe("logging Request", () => {
  it("should log a concise message and the full body in debug mode", () => {
    logRequest({
      data: { some: "body" },
      method: "GET",
      url: "http://example.com/api",
    } as AxiosRequestConfig);

    expect(logger.info).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith(
      {
        method: "GET",
        url: "http://example.org",
        body: { some: "body" },
      },
      "Request"
    );
  });
});
