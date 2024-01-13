import TodoDao from "./todo.dao";
import { Todo, TodoId } from "./todo.type";

class TodoService {
  async getAllUsers(): Promise<Todo[] | []> {
    return Object.values(TodoDao.getAllUsers);
  }

  async getTodos(): Promise<Todo[] | []> {
    return Object.values(TodoDao.getAll);
  }

  async getTodo(id: TodoId, workspaceId: string): Promise<Todo | undefined> {
    return await TodoDao.getById(id, workspaceId);
  }

  async updateById(
    id: TodoId,
    todo: Todo,
    workspaceId: string
  ): Promise<Todo | string> {
    return await TodoDao.updateById(id, todo, workspaceId);
  }

  async deleteById(id: TodoId, workspaceId: string): Promise<"Ok" | string> {
    return await TodoDao.deleteById(id, workspaceId);
  }

  async create(obj: Todo, workspaceId: string): Promise<Todo> {
    return await TodoDao.create(obj, workspaceId);
  }
}

export default new TodoService();
