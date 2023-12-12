const { authenticateToken, checkRole } = require("../auth/authMiddleware.js");

module.exports = (app) => {
  const dashboard = require("../controllers/dashboard.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.get(
    "/",
    authenticateToken,
    checkRole(["ApplicationUser"]),
    dashboard.findInfo
  );


  app.use("/api/stats", router);

};