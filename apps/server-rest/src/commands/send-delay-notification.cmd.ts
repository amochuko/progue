import { configureHttp } from "../http/configure-http";
import { getDelayedTodos } from "../jobs/notification/delay-notifications/delayed-todo.dao";
import { sendDelayNotification } from "../jobs/notification/delay-notifications/send-delay-notification";
import { logger } from "../utils/logger";

export async function cmdSendDelayNotifications(): Promise<void> {
  configureHttp();

  const now = new Date().toISOString().split("T")[0];
  await sendDelayNotifications(now);
  process.exit(1);
}

export async function sendDelayNotifications(
  startDate: string
): Promise<boolean> {
  logger.info({ startDate }, "Starting to send delay notifications.");
  // ...
  
  const todos = await getDelayedTodos(startDate).catch((err) => {
    logger.error(
      { startDate, err },
      "Could not retrieve delayed todos from the database. Aborting job..."
    );

    return null;
  });

  if (!todos) {
    return false;
  }

  for (const todo of todos) {
    await sendDelayNotification(todo);
  }

  logger.info({ startDate }, "Finished to send delay notifications.");
  return true;
}
