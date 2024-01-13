import { WorkspaceId } from '../types/workspace-id.type';

export interface AccessPermit<T> {
  type: T;
}

export type WorkspaceAccess = { type: 'workspace'; workspaceId: WorkspaceId };

export function workspaceAccess(workspaceId: WorkspaceId): WorkspaceAccess {
  return {
    type: 'workspace',
    workspaceId,
  };
}

export const adminAccess: AccessPermit<'admin'> = { type: 'admin' };

export type ServiceAccess<T> = AccessPermit<T> | WorkspaceAccess;
