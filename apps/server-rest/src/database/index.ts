import { relative } from 'path';
import { Pool, QueryResult } from 'pg';
import Cursor from 'pg-cursor';

const pool = new Pool({
  port: 55000,
  host: 'localhost',
  database: 'dvdrental',
  user: 'postgres',
  password: 'postgrespw',
  ssl: process.env.NODE_ENV == 'production' && { rejectUnauthorized: false },
});

interface FilmReturn {
  limit: number;
}

/**
 * Get the number of films out
 * @param limit Number of rows to return
 * @returns film
 */
export async function getFilms({ limit }: FilmReturn) {
  try {
    // using `cursor`
    const text = `SELECT * FROM film 
        ORDER BY title
        LIMIT $1`;
        
    const values = [limit];

    const cursor = await pool.query(new Cursor(text, values));

    cursor.read(100, (err, rows) => {
      try {
        return rows;
      } catch (err) {
        if (err) throw err;
      } finally {
        cursor.close();
      }
    });
  } catch (err) {
    throw err;
  } finally {
    await pool.end();
  }
}

export async function getUser() {
  try {
    const res = await pool.query({
      text: `SELECT * FROM users WHERE  id = $1`,
      values: [1],
    });

    console.log(res);
  } catch (err: any) {
    console.error(err.stack);
  } finally {
    await pool.end();
  }
}

// TRANSACTION
export async function transaction() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const users = await client.query({
      text: `INSERT INTO users(name) VALUES($1) RETURNING id`,
      values: ['brain'],
    });

    await client.query({
      text: `INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)`,
      values: [users.rows[0].id, 's3.bucker.foo'],
    });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    await client.release();
  }
}

// You will see your environment variables printed to your console. An attacker can use this exploit to execute any arbitrary node code within your process.
// const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log(process.env)] = null;\n//"`;
// const res = await pool.query(`SELECT NOW()`);
// console.log(res);

interface InsertCallback {
  text: string;
  callback?: (err: Error, res: QueryResult<any>) => void;
  params?: Array<any>;
}

type mixed = any;

interface QueryConfig {
  text: string;
  values?: Array<mixed>;
  name?: string;
  rowMode?: string;
  types: {};
}
interface Callback {
  (err: Error, res: QueryResult<any>): void;
}

export default {
  query: async (text: string, params: any[]): Promise<any> => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
  createTable: async ({ text }: { text: string }): Promise<any> => {
    return await pool.query(text);
  },
  insert: async ({ text, params, callback }: InsertCallback) => {
    return pool.query(text, params, callback);
  },
  getClient: async () => {
    const client = pool.connect();
    const query = (await client).query;
    const release = (await client).release;

    // set a timeout of 5 second, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!');
      console.error(
        `The last executed query onn this client was ${client.lastQuery}`
      );
    }, 5000);

    // monkey patch the query method to keep track of the last query executed
    client.query = (...args: any) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };
    client.release = () => {
      // call the actual `done` method, returning this client to the pool
      // clear our timeout
      clearTimeout(timeout);

      // set the query method back to its old un-monkey-patched version
      client.query = query;
      client.release = relative;
      return release.apply(client);
    };
  },
};
