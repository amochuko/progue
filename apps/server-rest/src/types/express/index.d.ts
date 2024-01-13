import { User } from "../custom";

declare global {
  namespace Express {
    export interface Request {
      /** Authenticated User object  */
      user?: User;
    }
  }
}
