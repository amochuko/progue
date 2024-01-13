import { v4 as uuid } from "uuid";
import {
  migrateDatabase,
  truncateTables,
} from "../../../../database/db-test.function";
import TodoDao from "../../todo.dao";
import { Todo } from "../../todo.type";
import { createStubTodo } from "../../utils/todo.stub";

const cStub = createStubTodo();
let stubTodo: Omit<typeof cStub, "id">;
let mockTodo: any;
let workspaceId: any;
let createdTodo: Todo;
let toBeUpdatedTodo: any;
let wksp1: any;
let wksp2: any;

describe("the todo dao", () => {
  beforeEach(async () => {
    wksp1 = uuid();
    wksp2 = uuid();
    workspaceId = uuid();
    stubTodo = {
      assignee: "Drive",
      dueDate: "2022/08/05",
      name: "mike",
      tasks: [],
    };
    createdTodo = await TodoDao.create(stubTodo, workspaceId);
    toBeUpdatedTodo = stubTodo;
  });
  beforeAll(migrateDatabase);
  afterEach(truncateTables);
  afterEach(() => {
    workspaceId = undefined;
    // createdTodo = null;
    wksp1 = "";
    wksp2 = "";
  });

  it("retrieves no todos if there are none in this workspace", async () => {
    const res = await TodoDao.getAll(workspaceId);
    expect(res).resolves.toEqual([]);
  });

  it("inserts a todo and retrieves it", async () => {
    expect(createdTodo).toHaveProperty("id");
    await expect(TodoDao.getAll(workspaceId)).resolves.toEqual([mockTodo]);
    await expect(TodoDao.getById(workspaceId, createdTodo.id)).resolves.toEqual(
      mockTodo
    );
  });

  it("updates an existing todo", async () => {
    const updatedTodo = await TodoDao.updateById(
      workspaceId,
      toBeUpdatedTodo,
      createdTodo.id
    );

    await expect(TodoDao.getAll(workspaceId)).resolves.toEqual([updatedTodo]);
    await expect(TodoDao.getById(workspaceId, createdTodo.id)).resolves.toEqual(
      updatedTodo
    );
  });

  it("does not find non-existing todo on update", async () => {
    await expect(
      TodoDao.updateById(workspaceId, stubTodo, uuid())
    ).resolves.toEqual("NotFound");
  });

  it("does not find a non-existing todo on delete", async () => {
    await expect(TodoDao.deleteById(workspaceId, uuid())).resolves.toEqual(
      "NotFound"
    );
  });

  it("does not retrieve a todo of a different workspace", async () => {
    await expect(TodoDao.getAll(wksp2)).resolves.toEqual([]);
    await expect(TodoDao.getById(wksp2, createdTodo.id)).resolves.toEqual(
      undefined
    );
  });

  it("does not update a todo of different workspace", async () => {
    const updatedTodo = await TodoDao.updateById(
      wksp1,
      stubTodo,
      toBeUpdatedTodo
    );
  });
});
