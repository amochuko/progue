import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

export function isAxiosError<T>(
  err: Error | AxiosError<T>
): err is AxiosError<T> {
  return "isAxiosError" in err && err.isAxiosError;
}

export function handlerHttpError(
  err: Error,
  req: Request,
  res: Response,
  nxt: NextFunction
): void {
  if (isAxiosError(err)) {
    req.log.error(
      {
        method: err.config.method?.toUpperCase(),
        url: err.config.url,
        headers: err.config.headers,
        params: err.config.params,
        message: err.message,
        response: {
          status: err.response?.status,
          data: err.response?.data,
        },
        stack: err.stack,
      },
      "Error Response"
    );

    res.status(500).json({
      message: "Failed request",
      method: err.config.method?.toUpperCase(),
      url: err.config.url,
    });
  } else {
    nxt(err);
  }
}
