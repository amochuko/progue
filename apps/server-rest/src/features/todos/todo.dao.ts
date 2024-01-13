import { v4 } from "uuid";
import dbOne from "../../database";
import { db } from "../../database/db-connect";
import { WorkspaceId } from "../../types/workspace-id.type";
import { DBTodo, Todo, todoFields, TodoId } from "./todo.type";

interface UserObj {
  email: string;
}

class TodoDao {
  async createUserTable() {
    try {
      await dbOne.createTable({
        text: `CREATE EXTENSION IF NOT EXISTS "pgcrypto"; 
      CREATE TEMP TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB,
        date_col TIMESTAMPTZ NOT NULL,
        birth_date TIMESTAMPTZ NOT NULL,
        log_time TIMESTAMPTZ NOT NULL
      );`,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Fetches User object
   * @param {number} limit  to limit returned row
   */
  async getAllUsers(limit: number) {
    try {
      await this.createUserTable();
      const now = new Date();

      dbOne.query(`SELECT * FROM users LIMIT $1`, [limit], (err, res) => {
        if (err) {
          throw err;
        }
        return res;
      });
    } catch (err) {
      throw err;
    } finally {
      //pool.end();
    }
  }

  /**
   * Create User object
   * @param email {string} email address of user
   */
  async createUser({ email }: UserObj) {
    try {
      await this.createUserTable();
      const now = new Date();

      dbOne.query(
        `INSERT INTO users(data, date_col, birth_date, log_time) VALUES ($1, $2 , $3, $4) RETURNING *`,
        [{ email }, now, now, now],
        (err, res) => {
          if (err) {
            throw err;
          }
          return res;
        }
      );
    } catch (err) {
      throw err;
    } finally {
      //pool.end();
    }
  }
  async getUsers(obj: any): Promise<any> {
    try {
      const q = {
        text: `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
        values: ["brain", "brain.calsone@gmail.com"],
      };
      await dbOne.query(q.text, q.values, (err, res) => {
        console.log(res.rows);
      });
    } catch (err: any) {
      console.error(err.stack);
    } finally {
      //
    }
  }

  async getAll(workspaceId: WorkspaceId): Promise<Todo[]> {
    return db
      .table<DBTodo>("todos")
      .where("workspaceId", workspaceId)
      .select(todoFields);
  }

  async getById(
    id: TodoId,
    workspaceId: WorkspaceId
  ): Promise<Todo | undefined> {
    return db
      .table<DBTodo>("todos")
      .where("id", id)
      .andWhere("workspaceId", workspaceId)
      .first<Todo>(todoFields);
  }

  async create(
    todo: Omit<Todo, "id">,
    workspaceId: WorkspaceId
  ): Promise<Todo> {
    const body = {
      ...todo,
      id: v4(),
    };
    await db.table<DBTodo>("todos").insert({ ...body, workspaceId });
    return body;
  }

  async update(id: TodoId, todo: Partial<Todo>) {
    // TODO: implement later
  }
  async updateById(
    id: TodoId,
    todo: Omit<Todo, "id">,
    workspaceId: WorkspaceId
  ): Promise<Todo | "Not Found"> {
    const update = {
      ...todo,
      id,
    };
    const changedRowCount = await db
      .table<DBTodo>("todos")
      .where("id", id)
      .andWhere("workspaceId", workspaceId)
      .update({ workspaceId, ...update });

    return changedRowCount === 0 ? "Not Found" : update;
  }

  async deleteById(id: TodoId, workspaceId: WorkspaceId): Promise<string> {
    const deletedRowCount = await db
      .table<DBTodo>("todos")
      .where("id", id)
      .andWhere("workspaceId", workspaceId)
      .delete();

    return deletedRowCount === 0 ? "Not Found" : "Ok";
  }
}

export default new TodoDao();
