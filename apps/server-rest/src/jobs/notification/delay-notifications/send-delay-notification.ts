import { logger } from "../../../utils/logger";
import { sendNotification } from "./notification.service";
import { DBTodo } from "./todo.type";

export async function sendDelayNotification(
  todo: Pick<DBTodo, "id" | "workspaceId">
): Promise<boolean> {
  try {
    await sendNotification(todo.workspaceId, `Todo ${todo.id} is delayed`);
    return true;
  } catch (err) {
    logger.error(
      { workspaceId: todo.workspaceId, todoId: todo.id, err },
      "Could not send delayed todo. Skipping it..."
    );
    return false;
  }
}
