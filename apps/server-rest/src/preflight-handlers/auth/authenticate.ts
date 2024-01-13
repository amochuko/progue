import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import JwksRsa from "jwks-rsa";
import { config } from "../../configuration";
import { JwtTokenPayload } from "../../utils/jwt-token";

const jwksClient = JwksRsa({ jwksUri: config.authentication.jwksUrl });

export async function authenticate(
  req: Request,
  res: Response,
  nxt: NextFunction
): Promise<unknown> {
  try {
    // extract JWT from header and return 401 on failure
    const token = req.headers.authorization?.replace("Bearer ", "") || "";

    // decode JWT and return 403 on failure
    const decodeToken = jwt.decode(token, { complete: true });

    if (decodeToken && !isValidPayload(decodeToken.payload)) {
      throw new Error("Unexpected structure of JWT payload");
    }

    if (!token) {
      return res.status(401).end();
    }

    if (!decodeToken) {
      return res.status(403).end();
    }
    // if auth is enabled, then verify JWT and return 403 on failure
    if (config.authentication.enabled) {
      try {
        const signingKey = await jwksClient.getSigningKey(
          decodeToken.header.kid
        );
        jwt.verify(token, signingKey.getPublicKey(), {
          algorithms: ["RS256"],
        });
      } catch (err) {
        return res.status(403).end();
      }
    }
    // Make decoded JWT payload accessible to controller
    res.locals.token = decodeToken.payload;
    nxt();
  } catch (err: any) {
    nxt(err);
  }
}

function isValidPayload(
  payload: string | jwt.JwtPayload
): payload is JwtTokenPayload {
  return typeof payload !== "string" && "workspaceId" in payload;
}
