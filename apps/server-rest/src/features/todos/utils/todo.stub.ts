import { v4 as uuid } from "uuid";
import { Todo } from "../todo.type";

// Stub that mocks data (internal dependency)
// always keep it simple
export const createStubTodo = (): Todo => ({
  id: uuid(),
  name: "Decode file",
  assignee: "Jeff Alfonzo",
  dueDate: new Date().toISOString(),
  tasks: [
    { description: "Clean up the codec of the file system to wait for it" },
  ],
});
