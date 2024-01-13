import express from "express";
import TodoController from "./todos.ctrl";

const todoRoute = express.Router();
//todoRoute.use(authenticate);
//todoRoute.use(validateInputs);

todoRoute.get("/", TodoController.getAll);
todoRoute.get("/users", TodoController.getAllUsers);
todoRoute.get("/:id", TodoController.getById);
todoRoute.post("/", TodoController.create);
todoRoute.put("/:id", TodoController.update);
todoRoute.delete("/:id", TodoController.deleteById);

module.exports = todoRoute;
