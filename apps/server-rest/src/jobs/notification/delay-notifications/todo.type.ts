import { WithWorkspaceId } from "../../../types/workspace-id.type";

export type TodoId = string;
export interface Todo {
  id: TodoId;
  dueDate: string;
}

export type DBTodo = Todo & WithWorkspaceId;
