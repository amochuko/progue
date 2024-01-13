import request from "supertest";
import { v4 as uuid } from "uuid";
import { testServer } from "../../../../utils/test.server";
import todosCtrl from "../../todos.ctrl";
import { createStubTodo } from "../../utils/todo.stub";

// Mock data access (external dependency)
jest.mock("../../todo.dao");

it("checks stub", () => {
  const todo = createStubTodo();
});
it("checks stub with omitted data", () => {
  // Omit some data
  // const todo = omit("id", createStubTodo());
});

describe("getTodoController", () => {
  it("returns the todo with the id", async () => {
    const todo = createStubTodo();
    const getTodo = require("../../todo.dao").getTodo;
    getTodo.mockResolvedValue(todo);

    expect(getTodo).toHaveBeenCalledWith(todo.id);
  });

  it("returns a 404 if no todo with that id exist", async () => {
    const todoId = uuid();
    const getTodo = require("../../todo.dao").getTodo;
    getTodo.mockResolvedValue(undefined);

    expect(getTodo).toHaveBeenCalledWith(todoId);
  });
});

describe("putTodoController", () => {
  const route = "/todos/:id";

  // spin up http server
  const app = testServer((app) => {
    // setup endpoint
    app.put(route, todosCtrl.update);

    // TODO:use this server to add error handling middleware and to mock authentication middleware
  });

  it("updates a todo", async () => {
    // get data access function mock
    const updateTodo = require("../../todo.dao").updateTodo;
    // create stub (if needed)
    const todo = createStubTodo();

    // setup mocks
    updateTodo.mockResolvedValue(todo);

    // send request and expect response
    const resp = await request(app)
      .put(route.replace(":id", todo.id))
      .send(todo)
      .expect(200);

    console.log(resp);

    // expect response body
    expect(resp).toHaveProperty("body", todo);
    // expect data access function to be called
    expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
  });
});

describe("deleteTodoController", () => {
  const route = "/todos/:id";

  const app = testServer((app) => {
    app.delete(route, todosCtrl.deleteById);
  });

  it("rejects an invalid ID", async () => {
    const deleteTodo = require("../../todo.dao").deleteTodo;
    const todoId = "123";
    deleteTodo.mockResolvedValue();

    const resp = await request(app)
      .delete(route.replace(":id", todoId))
      .expect(400);

    expect(resp).toHaveProperty(
      "body.message",
      'request.params.id should match format "uuid"'
    );

    expect(deleteTodo).not.toHaveBeenCalled();
  });
});
