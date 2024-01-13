import { rest } from "msw";

const sessionStorage = new Map();

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    sessionStorage.set("isAuthed", "true");

    return res(ctx.status(200));
  }),
  rest.get("/user", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.get("isAuthed");
    if (!isAuthenticated) {
      return res(ctx.status(403), ctx.json({ errorMessage: "Not authorized" }));
    }

    return res(ctx.status(200), ctx.json({ username: "admin" }));
  }),
];
