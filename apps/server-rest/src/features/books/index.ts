import csurf from "csurf";
import express from "express";
const bookRouter = express.Router();

bookRouter.get("/", (req, res, next) => {
  res.send("Get a random book");
  next();
});

bookRouter.get("/process", csurf(), (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({ data: "data is being protected..." });
  next();
});

bookRouter.post("/add", (req, res, next) => {
  res.json({ data: req.body, grace: req.app.locals["grace"] });
  next();
});

bookRouter.put("/add", (req, res) => {
  res.json({});
});

bookRouter.delete("/delete", (req, res) => {
  res.send("Delete the book");
});

bookRouter.post(
  "/upload",
  // downloadOption.array("uploadedFiles", 5),
  (req, res) => {
    // NB: acces file obj - req.files;
  }
);

bookRouter.param("user_id", (req, res, next, id) => {
  res.locals.user = {
    id: id,
    name: "TJ",
  };
  next();
});

bookRouter
  .route("/users/:user_id")
  .all(function (req, res, next) {
    console.log("Hits all");
    next();
  })
  .get((req, res, next) => {
    res.json({ data: res.locals });
  })
  .post((req, res, next) => {
    res.json(res.locals);
  })
  .delete(function (req, res, next) {
    next(new Error("Not implemented"));
  });

module.exports = bookRouter;
