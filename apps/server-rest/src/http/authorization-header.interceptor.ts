import { AxiosRequestConfig } from "axios";
import { getJWT } from "./get-jwt";
import { ServiceAccess, WorkspaceAccess } from "./service-access.type";

function isValidServiceAccess(
  access: unknown
): access is ServiceAccess<string> {
  return typeof access === "object" && !!access && "type" in access;
}

function isWorkspaceAccess(
  access: ServiceAccess<string>
): access is WorkspaceAccess {
  return "type" in access && access.type === "workspace";
}

export async function attachAuthorization(
  axiosRequestConfig: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  const access = (axiosRequestConfig as { access: unknown }).access;
  
  if (
    !axiosRequestConfig.headers?.Authorization &&
    isValidServiceAccess(access)
  ) {
    const jwt = await getJWT(
      isWorkspaceAccess(access)
        ? `workspaceId=${access.workspaceId}`
        : undefined
    );
    if (!axiosRequestConfig.headers) {
      axiosRequestConfig.headers = {};
    }
    axiosRequestConfig.headers["Authorization"] = `Bearer ${jwt}`;
  }
  return axiosRequestConfig;
}
