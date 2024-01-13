import { db } from "../../../database/db-connect";
import { DBTodo } from "./todo.type";

export function getDelayedTodos(
  now: string
): Promise<Pick<DBTodo, "id" | "workspaceId">[]> {
  return db
    .table<DBTodo>("todos")
    .where("dueDate", "<=", now)
    .select("id", "workspaceId");
}
