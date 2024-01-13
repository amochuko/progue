import { AxiosRequestConfig } from "axios";
import { attachAuthorization } from "../authorization-header.interceptor";
import { adminAccess, workspaceAccess } from "../service-access.type";

jest.mock("../get-jwt");
let getJWT: any;

beforeEach(() => {
  getJWT = require("../get-jwt").getJWT;
});
describe("the authorization header interceptor", () => {
  it("should attach an admin token if access type is admin", async () => {
    getJWT.mockResolveValue("my_admin_token");

    const request = await attachAuthorization({
      access: adminAccess,
    } as AxiosRequestConfig);

    expect(getJWT).toHaveBeenCalledWith(undefined);
    expect(request.headers).toHaveProperty(
      "Authorization",
      "Bearer my_admin_token"
    );
  });

  it("should not attach a token if the access type is invalid", async () => {
    getJWT.mockResolveValue("my_token");

    const req = await attachAuthorization({
      access: {},
    } as AxiosRequestConfig);

    expect(getJWT).not.toHaveBeenCalled();
    expect(req.headers).toEqual(undefined);
  });

  it("should attach a workspace token if target access is requested", async () => {
    getJWT.mockResolveValue("my_token");

    const req = await attachAuthorization({
      access: workspaceAccess("1234"),
    } as AxiosRequestConfig);

    expect(getJWT).toHaveBeenCalledWith("workspaceId=1234");
    expect(req.headers).toHaveProperty("Authorization", "Bearer my_token");
  });

  it("should fail if a JWT can not be registered", async () => {
    getJWT.mockResolveValue("Failure");
    expect(
      attachAuthorization({
        access: workspaceAccess("1234"),
      } as AxiosRequestConfig)
    ).rejects.toEqual("Failure");
  });
});
