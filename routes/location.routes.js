const { authenticateToken, checkRole } = require("../auth/authMiddleware.js");

module.exports = (app) => {
  const location = require("../controllers/location.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    location.create
  );

  // Retrieve all location
  router.get(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    location.findAll
  );

  // Retrieve all published location
  router.get(
    "/published",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    location.findAllPublished
  );

  // Retrieve a single Tutorial with id
  router.get(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    location.findOne
  );

  // Update a Tutorial with id
  router.put(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    location.update
  );

  // Delete a Tutorial with id
  router.delete(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    location.delete
  );

  // Delete all location
  router.delete(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    location.deleteAll
  );

  app.use("/api/location", router);
};
