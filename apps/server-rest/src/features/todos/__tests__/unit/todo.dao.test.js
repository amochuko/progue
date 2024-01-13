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
const uuid_1 = require("uuid");
const db_test_function_1 = require("../../../../database/db-test.function");
const todo_dao_1 = __importDefault(require("../../todo.dao"));
const todo_stub_1 = require("../../utils/todo.stub");
const cStub = (0, todo_stub_1.createStubTodo)();
let stubTodo;
let mockTodo;
let workspaceId;
let createdTodo;
let toBeUpdatedTodo;
let wksp1;
let wksp2;
describe("the todo dao", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        wksp1 = (0, uuid_1.v4)();
        wksp2 = (0, uuid_1.v4)();
        workspaceId = (0, uuid_1.v4)();
        stubTodo = {
            assignee: "Drive",
            dueDate: "2022/08/05",
            name: "mike",
            tasks: [],
        };
        createdTodo = yield todo_dao_1.default.create(stubTodo, workspaceId);
        toBeUpdatedTodo = stubTodo;
    }));
    beforeAll(db_test_function_1.migrateDatabase);
    afterEach(db_test_function_1.truncateTables);
    afterEach(() => {
        workspaceId = undefined;
        // createdTodo = null;
        wksp1 = "";
        wksp2 = "";
    });
    it("retrieves no todos if there are none in this workspace", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todo_dao_1.default.getAll(workspaceId);
        expect(res).resolves.toEqual([]);
    }));
    it("inserts a todo and retrieves it", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(createdTodo).toHaveProperty("id");
        yield expect(todo_dao_1.default.getAll(workspaceId)).resolves.toEqual([mockTodo]);
        yield expect(todo_dao_1.default.getById(workspaceId, createdTodo.id)).resolves.toEqual(mockTodo);
    }));
    it("updates an existing todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTodo = yield todo_dao_1.default.updateById(workspaceId, toBeUpdatedTodo, createdTodo.id);
        yield expect(todo_dao_1.default.getAll(workspaceId)).resolves.toEqual([updatedTodo]);
        yield expect(todo_dao_1.default.getById(workspaceId, createdTodo.id)).resolves.toEqual(updatedTodo);
    }));
    it("does not find non-existing todo on update", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(todo_dao_1.default.updateById(workspaceId, stubTodo, (0, uuid_1.v4)())).resolves.toEqual("NotFound");
    }));
    it("does not find a non-existing todo on delete", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(todo_dao_1.default.deleteById(workspaceId, (0, uuid_1.v4)())).resolves.toEqual("NotFound");
    }));
    it("does not retrieve a todo of a different workspace", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(todo_dao_1.default.getAll(wksp2)).resolves.toEqual([]);
        yield expect(todo_dao_1.default.getById(wksp2, createdTodo.id)).resolves.toEqual(undefined);
    }));
    it("does not update a todo of different workspace", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTodo = yield todo_dao_1.default.updateById(wksp1, stubTodo, toBeUpdatedTodo);
    }));
});
