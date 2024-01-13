import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { WithWorkspaceId } from "../types/workspace-id.type";

export type JwtTokenPayload = JwtPayload & WithWorkspaceId;

export function getToken(res: Response): JwtTokenPayload {
  return res.locals.token;
}
