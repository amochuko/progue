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
const todo_stub_1 = require("../../utils/todo.stub");
// Mock data access (external dependency)
jest.mock("../../todo.dao");
it("checks stub", () => {
    const todo = (0, todo_stub_1.createStubTodo)();
});
it("checks stub with omitted data", () => {
    // Omit some data
    // const todo = omit("id", createStubTodo());
});
describe("getTodoController", () => {
    it("returns the todo with the id", () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = (0, todo_stub_1.createStubTodo)();
        const getTodo = require("../../todo.dao").getTodo;
        getTodo.mockResolvedValue(todo);
        expect(getTodo).toHaveBeenCalledWith(todo.id);
    }));
    it("returns a 404 if no todo with that id exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = (0, uuid_1.v4)();
        const getTodo = require("../../todo.dao").getTodo;
        getTodo.mockResolvedValue(undefined);
        expect(getTodo).toHaveBeenCalledWith(todoId);
    }));
});
describe("putTodoController", () => {
    const route = "/todos/:id";
    // spin up http server
    const app = (0, test_server_1.testServer)((app) => {
        // setup endpoint
        app.put(route, todos_ctrl_1.default.update);
        // TODO:use this server to add error handling middleware and to mock authentication middleware
    });
    it("updates a todo", () => __awaiter(void 0, void 0, void 0, function* () {
        // get data access function mock
        const updateTodo = require("../../todo.dao").updateTodo;
        // create stub (if needed)
        const todo = (0, todo_stub_1.createStubTodo)();
        // setup mocks
        updateTodo.mockResolvedValue(todo);
        // send request and expect response
        const resp = yield (0, supertest_1.default)(app)
            .put(route.replace(":id", todo.id))
            .send(todo)
            .expect(200);
        console.log(resp);
        // expect response body
        expect(resp).toHaveProperty("body", todo);
        // expect data access function to be called
        expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
    }));
});
describe("deleteTodoController", () => {
    const route = "/todos/:id";
    const app = (0, test_server_1.testServer)((app) => {
        app.delete(route, todos_ctrl_1.default.deleteById);
    });
    it("rejects an invalid ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTodo = require("../../todo.dao").deleteTodo;
        const todoId = "123";
        deleteTodo.mockResolvedValue();
        const resp = yield (0, supertest_1.default)(app)
            .delete(route.replace(":id", todoId))
            .expect(400);
        expect(resp).toHaveProperty("body.message", 'request.params.id should match format "uuid"');
        expect(deleteTodo).not.toHaveBeenCalled();
    }));
});
