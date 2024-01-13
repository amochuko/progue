import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "../auth/authenticate";
import { jwtTokenStub } from "../auth/jwt.stub";

jest.mock("../../configuration/config", () => ({
  config: {
    authentication: {
      enabled: true,
      jwksUrl: "https://example.com",
    },
  },
}));

jest.mock("jwks-rsa", () => ({
  getSigningKey: () =>
    Promise.resolve({
      getPublicKey: () => `----BEGIN RSA PUBLIC KEY
    abc
    ----END RSA PUBLIC KEY`,
    }),
}));

export function mockControllerInputs(req: Partial<Request> = {}): {
  request: Request;
  response: Response;
  next: NextFunction;
} {
  return {
    request: {
      log: {
        error: jest.fn().mockImplementation(),
      },
      params: {},
      ...req,
    } as unknown as Request,
    response: {
      locals: {},
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      send: jest.fn(),
      end: jest.fn().mockReturnThis(),
    } as unknown as Response,
    next: jest.fn() as NextFunction,
  };
}

it("returns 1 401 if no authorization header is present", async () => {
  const { request, response, next } = mockControllerInputs({ headers: {} });

  jest.spyOn(jwt, "decode").mockReturnValue(jwtTokenStub);
  jest.spyOn(jwt, "verify").mockReturnValue();

  await authenticate(request, response, next);
  expect(response.status).toHaveBeenCalledWith(401);
  expect(next).not.toHaveBeenCalled();
});
