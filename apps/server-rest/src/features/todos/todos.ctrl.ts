import { NextFunction, Request, Response } from "express";
import Notification from "../../service/notification.service";
import { getToken } from "../../utils/jwt-token";
import TodoService from "./todos.service";

class TodoController {
  async getAllUsers(
    _req: Request,
    res: Response,
    nxt: NextFunction
  ): Promise<void> {
    try {
      const data = await TodoService.getAllUsers();
      if (data) {
        Notification.send("Data sent", data);
        res.json(data);
      }
    } catch (err) {
      nxt(err);
    }
  }
  async getAll(_req: Request, res: Response, nxt: NextFunction): Promise<void> {
    try {
      const data = await TodoService.getTodos();
      if (data) {
        Notification.send("Data sent", data);
        res.json(data);
      }
    } catch (err) {
      nxt(err);
    }
  }

  async getById(req: Request, res: Response, nxt: NextFunction): Promise<void> {
    try {
      const todo = await TodoService.getTodo(
        req.params.id,
        getToken(res).workspaceId
      );

      if (!todo) {
        res.sendStatus(404);
      } else {
        res.send(todo);
      }
    } catch (err) {
      nxt(err);
    }
  }

  async create(req: Request, res: Response, nxt: NextFunction): Promise<void> {
    try {
      const todo = await TodoService.create(
        req.body,
        getToken(res).workspaceId
      );
      if (todo) {
        Notification.send("Todo created: ", todo);
        res.json(todo);
      }
    } catch (err) {
      nxt(err);
    }
  }

  async deleteById(
    req: Request,
    res: Response,
    nxt: NextFunction
  ): Promise<void> {
    try {
      const num = await TodoService.deleteById(
        req.params.id,
        getToken(res).workspaceId
      );
      if (num) {
        Notification.send("Done", `Deleted todo ${req.params.id}`);
        res.json(204);
      }
    } catch (err) {
      nxt(err);
    }
  }

  async update(req: Request, res: Response, nxt: NextFunction): Promise<void> {
    try {
      const updatedTodo = await TodoService.updateById(
        req.params.id,
        req.body,
        getToken(res).workspaceId
      );
      if (updatedTodo) {
        Notification.send("Update successful", updatedTodo);
        res.json(updatedTodo);
      }
    } catch (err) {
      nxt(err);
    }
  }
}

export default new TodoController();
