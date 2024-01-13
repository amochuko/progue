import { Knex } from "knex";
import { DBTodo } from "../../features/todos/todo.type";
import { WorkspaceId } from "../../types/workspace-id.type";

export const initTable = () => {
  const tableExist = async (
    knex: Knex,
    tableName: string
  ): Promise<boolean> => {
    return await knex.schema.hasTable(tableName);
  };

  return {
    up: async (knex: Knex): Promise<void> => {
      const table = await tableExist(knex, "todos");
      if (!table) {
        await knex.schema.createTable("todos", (t) => {
          t.uuid("id").primary();
          t.string("name").notNullable();
          t.string("assignee").notNullable();
          t.date("dueDate").notNullable();
          t.string("tasks").notNullable();
        });
      }
    },
    down: async (knex: Knex): Promise<void> => {
      const table = await tableExist(knex, "todos");
      if (table) {
        await knex.schema.dropTable("todos");
      }
    },
  };
};

const workspaceId1: WorkspaceId = "a9393008-eab2-48e8-b820-0e03447f881c";
const workspaceId2: WorkspaceId = "83fdfa88-737d-4550-87e4-c78bf954fcf2";

const todos: Partial<DBTodo>[] = [
  {
    id: "142e8446-f5ba-4813-bfb5-f3192a37f1bf",
    name: "Create Todo",
    assignee: "Naomi",
    dueDate: "2025-01-05",
    tasks: [],
    workspaceId: workspaceId1,
  },
  {
    id: "bf6091cc-69f8-4a9e-93ed-0294c3a8ac2f",
    name: "Delete Todo",
    assignee: "Peter",
    dueDate: "2029-06-11",
    tasks: [],
    workspaceId: workspaceId1,
  },
  {
    workspaceId: workspaceId1,
    id: "6e5bad4c-7f1c-4ab4-9361-c6bd697b4257",
    name: "Workspace 1 - Todo 3",
    assignee: "Sheila",
    dueDate: "2032-11-27",
  },
  {
    workspaceId: workspaceId2,
    id: "1d2be9f2-4fe9-4509-b8ec-d0d9425c3685",
    name: "Workspace 2 - Todo 1",
    assignee: "Ousmane",
    dueDate: "2020-07-14",
  },
  {
    workspaceId: workspaceId2,
    id: "e868f10d-d21a-4139-9c5d-b8c73c62735a",
    name: "Workspace 2 - Todo 2",
    assignee: "Carla",
    dueDate: "2034-09-07",
  },
  {
    workspaceId: workspaceId1,
    id: "bf6091cc-69f8-4a9e-93ed-0294c3a8ac2f",
    name: "Workspace 1 - Todo 2",
    assignee: "Peter",
    dueDate: "2020-06-11",
  },
];

export async function seed(knex: Knex): Promise<void> {
  await initTable().down(knex);
  await initTable().up(knex);
  await knex("todos").truncate();
  await knex("todos").insert(todos);
}
