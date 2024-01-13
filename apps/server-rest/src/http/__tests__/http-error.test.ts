import { AxiosError } from "axios";
import { mockControllerInputs } from "../../preflight-handlers/__tests__/authentication.test";
import { handlerHttpError } from "../http-error-handler";

describe("the HTTP error handler", () => {
  it("should log the HTTP error and send a 500", () => {
    const { request, response, next } = mockControllerInputs({
      headers: {},
    });

    const err = new AxiosError(
      "message",
      "code",
      {
        method: "get",
        url: "https://example.com/",
        headers: {
          a: "b",
        },
        params: { c: "d" },
      },
      {},
      {
        status: 200,
        statusText: "statusText",
        data: {},
        headers: {},
        config: {},
      }
    );

    handlerHttpError(err, request, response, next);
    expect(request.log.error).toHaveBeenCalledWith(
      {
        method: "GET",
        url: "https://example",
        headers: {
          a: "b",
        },
        params: {
          c: "d",
        },
        message: "message",
        response: {
          status: 200,
          data: {},
        },
        stack: err.stack,
      },
      "Error Response"
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should skip different errors", () => {
    const { request, response, next } = mockControllerInputs({ headers: {} });
    const error = new Error("No HTTP error");
    handlerHttpError(error, request, response, next);
    expect(request.log.error).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
