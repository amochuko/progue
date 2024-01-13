import Constant from "../../constant";
import { getJWT } from "../get-jwt";

jest.mock("../../../configuration/config", () => ({
  config: {
    http: {
      servicesUrl: "https://example.com",
      clientId: "todos",
      clientSecret: "secret",
    },
  },
}));

jest.mock("axios");

describe("the retrieval of JWT", () => {
  it("should retrieve a JWT with admin access", async () => {
    const post = require("axios").post;
    post.mockResolveValue({
      data: {
        access_token: "sample_token",
      },
    });

    await expect(getJWT()).resolves.toEqual("sample_token");
    expect(post).toHaveBeenCalledWith("https://example.com/auth/token", "", {
      headers: {
        Authorization: "Basic dG9kb3M6c2VjcmV0",
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        grant_type: Constant.CLIENT_CRED,
      },
    });
  });

  it("should retrieve a Jwt with workspace access", async () => {
    const post = require("axios").post;

    post.mockResolveValue({
      data: {
        access_token: "mi_token",
      },
    });

    const scope = "workspaceId=1234-5678";
    await expect(getJWT(scope)).toEqual("mi_token");
    expect(post).toHaveBeenCalledWith("https://example.com/auth/token", "", {
      headers: {
        Authorization: "Basic dG9kb3M6c2VjcmV0",
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        grant_type: Constant.CLIENT_CRED,
        scope,
      },
    });
  });
});
