import axios, { AxiosRequestConfig } from "axios";
import { config } from "../../../configuration";
import { workspaceAccess } from "../../../http/service-access.type";
import { WorkspaceId } from "../../../types/workspace-id.type";

export function sendNotification(
  workspaceId: WorkspaceId,
  msg: string
): Promise<void> {
  return axios.post(
    `${config.http.servicesUrl}/notify/notifications`,
    { msg },
    { access: workspaceAccess(workspaceId) } as AxiosRequestConfig
  );
}
