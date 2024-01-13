import express from "express";
const searchRouter = express.Router();

searchRouter
  .route("/")
  .all(function (req, res, next) {
    console.log("Hits all: [searchRouter]");
    next();
  })
  .get(async (req, res, next) => {
    try {
      res.json({ format: req.query.val });
      next();
    } catch (err) {
      res.send(err);
    }
  });

searchRouter.route("/postcodes").post(async (req, res, next) => {
  res.send({ data: ["SW1A 0AA", "SW1A 0PW", "SW1A 1AA"] });
});

module.exports = searchRouter;
