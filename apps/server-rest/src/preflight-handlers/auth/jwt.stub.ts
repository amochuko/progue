import jwt from "jsonwebtoken";

export const jwtTokenStub: jwt.Jwt = {
  payload: {
    id: "42",
    username: "adm@com.org",
  },
  header: {
    kid: "kid",
    alg: "RS256",
  },
  signature: "",
};
