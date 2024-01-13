import axios, { AxiosRequestConfig } from "axios";
import { config } from "../configuration";
import { WorkspaceId } from "../types/workspace-id.type";

export class Notification {
  send(workspaceId: WorkspaceId, msg: string | object): Promise<void> {
    return axios.post(
      `${config.http.servicesUrl}/notify/notifications`,
      {
        msg,
      },
      {
        access: {
          type: "workspace",
          workspaceId,
        },
        validateStatus: (s) => (s >= 22 && s <= 300) || s == 404,
      } as AxiosRequestConfig
    );
  }
}

export default new Notification();
