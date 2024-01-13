import express from "express";
const usersRouter = express.Router();

usersRouter
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(async (req, res, next) => {
    try {
      const users = await res.app.locals.db.getUsers();
      res.json({ data: { users } });
      next();
    } catch (err) {
      res.send(err);
    }
  })
  .post((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send(400);
      return;
    }
    res.send({ userId: username, pwd: password });
    next();
  })
  .delete(function (req, res, next) {
    next(new Error("Not implemented"));
  });

usersRouter
  .route("/:userId")
  .get(async (req, res, next) => {
    try {
      const user = await res.app.locals.db.getUserById(req.params.userId);
      res.json({ data: { user } });
      next();
    } catch (err) {
      res.send(err);
    }
  })
  .post((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.sendStatus(400);
      return;
    }
    res.send({ userId: username, pwd: password });
    next();
  })
  .delete(function (req, res, next) {
    next(new Error("Not implemented"));
  });

module.exports = usersRouter;
