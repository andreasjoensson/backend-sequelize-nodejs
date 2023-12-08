const { signin } = require("../controllers/auth.controller");

module.exports = (app) => {
  var router = require("express").Router();
  router.post("/sign-in", signin);

  app.use("/api/auth", router);
};
