import { express, servers } from '@progue/express';
import { handlerHttpError } from './http/http-error-handler';
import { openApiSpec } from './preflight-handlers/openapi';

const app = servers.rest;

app.use(handlerHttpError);
app.use('/openapi.json', express.static(openApiSpec));

// Dependency Injection - DI
export async function makeApp() {
  app.use('/book', require('./features/books'));
  app.use('/users', require('./features/users'));
  app.use('/search', require('./features/search'));
  app.use('/todos', require('./features/todos/todo.router'));

  return app;
}
