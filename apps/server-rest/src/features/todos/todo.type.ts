import { WorkspaceId } from "../../types/workspace-id.type";

export type TodoId = string;

interface Task {
  description: string;
}

export const todoFields: (keyof Todo)[] = [
  "id",
  "name",
  "assignee",
  "dueDate",
  "tasks",
];

export interface DBTodo {
  id: TodoId;
  name: string;
  assignee: string;
  dueDate: string;
  tasks: Task[];
  workspaceId: WorkspaceId;
}

export interface Todo {
  id: TodoId;
  name: string;
  assignee: string;
  dueDate: string;
  tasks: Task[];
}
