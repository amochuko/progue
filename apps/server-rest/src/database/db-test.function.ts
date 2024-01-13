import { db } from "./db-connect";

export async function migrateDatabase() {
  await db.migrate.latest({ directory: "./src/database/migrations" });
}

export async function truncateTables() {
  await db.table("todos").truncate();
}
