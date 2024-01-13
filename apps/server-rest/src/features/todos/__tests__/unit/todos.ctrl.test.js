"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
const test_server_1 = require("../../../../utils/test.server");
const todos_ctrl_1 = __importDefault(require("../../todos.ctrl"));
const workspaceId = (0, uuid_1.v4)();
jest.mock("../../todo.dao");
jest.mock("../../../jwt-token", () => ({
    getToken: () => ({ workspaceId }),
}));
jest.mock("../../../../service/notification.service");
describe("TodoController.delete", () => {
    const route = "/todos/:id";
    const app = (0, test_server_1.testServer)((app) => {
        app.delete(route, todos_ctrl_1.default.deleteById);
    });
    it("deletes the todo, sends a notification and returns a 204", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTodo = require("../../todo.dao").updateById;
        const Notification = require('../../../../service/notification.service');
        const todoId = (0, uuid_1.v4)();
        deleteTodo.mockResolveValue();
        yield (0, supertest_1.default)(app).delete(route.replace(':id', todoId)).expect(204);
        expect(deleteTodo).toHaveBeenCalledWith(workspaceId, todoId);
        expect(Notification.send).toHaveBeenCalledWith(`Deleted todo ${todoId}`);
    }));
    it("delete the todo and returns a 204", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTodo = require("../../todo.dao").updateById;
        const todoId = (0, uuid_1.v4)();
        deleteTodo.mockResolveValue();
        yield (0, supertest_1.default)(app).delete(route.replace(":id", todoId)).expect(204);
        expect(deleteTodo).toHaveBeenCalledWith(workspaceId, todoId);
    }));
});
