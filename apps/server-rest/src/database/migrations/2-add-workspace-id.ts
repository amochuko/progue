import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("todos", (t) => {
    t.uuid("workspaceId").notNullable();
    t.dropPrimary();
    t.primary(["id", "workspaceId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("todos", (t) => {
    t.dropPrimary();
    t.primary(["id"]);
  });
}
