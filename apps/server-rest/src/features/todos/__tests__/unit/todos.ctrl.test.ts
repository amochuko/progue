import request from "supertest";
import { v4 as uuid } from "uuid";
import { testServer } from "../../../../utils/test.server";
import TodoController from "../../todos.ctrl";

const workspaceId = uuid();

jest.mock("../../todo.dao");
jest.mock("../../../jwt-token", () => ({
  getToken: () => ({ workspaceId }),
}));

jest.mock("../../../../service/notification.service");
describe("TodoController.delete", () => {
  const route = "/todos/:id";

  const app = testServer((app) => {
    app.delete(route, TodoController.deleteById);
  });

  it("deletes the todo, sends a notification and returns a 204", async () => {
    const deleteTodo = require("../../todo.dao").updateById;
    const Notification = require("../../../../service/notification.service");
    const todoId = uuid();
    deleteTodo.mockResolveValue();
    await request(app).delete(route.replace(":id", todoId)).expect(204);
    expect(deleteTodo).toHaveBeenCalledWith(workspaceId, todoId);
    expect(Notification.send).toHaveBeenCalledWith(`Deleted todo ${todoId}`);
  });
  it("delete the todo and returns a 204", async () => {
    const deleteTodo = require("../../todo.dao").updateById;
    const todoId = uuid();
    deleteTodo.mockResolveValue();
    await request(app).delete(route.replace(":id", todoId)).expect(204);
    expect(deleteTodo).toHaveBeenCalledWith(workspaceId, todoId);
  });
});
