import axios from "axios";
import memoize from "memoizee";
import { config } from "../configuration";
import Constant from "../constant";

function toBase64(data: string): string {
  return Buffer.from(data).toString("base64");
}

async function retrieveJWT(scope?: string): Promise<string> {
  const tokenResponse = await axios.post(
    `${config.http.servicesUrl}/auth/token`,
    "",
    {
      params: {
        grant_type: Constant.CLIENT_CRED,
        scope,
      },
      headers: {
        Authorization:
          "Basic " +
          toBase64(`${config.http.clientID}:${config.http.clientSecret}`),
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );

  return tokenResponse.data.access_token;
}

export const getJWT = memoize(retrieveJWT, {
  promise: true,
  maxAge: 30 * 60 * 1000, // 30mins
  max: 100,
});
