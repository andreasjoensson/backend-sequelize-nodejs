const { authenticateToken, checkRole } = require("../auth/authMiddleware.js");

module.exports = (app) => {
  const cars = require("../controllers/cars.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    cars.create
  );

  // Retrieve all cars
  router.get(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    cars.findAll
  );

  // Retrieve all published cars
  router.get(
    "/published",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    cars.findAllPublished
  );

  // Retrieve a single Tutorial with id
  router.get(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    cars.findOne
  );

  // Update a Tutorial with id
  router.put(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    cars.update
  );

  // Delete a Tutorial with id
  router.delete(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    cars.delete
  );

  // Delete all cars
  router.delete(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    cars.deleteAll
  );

  app.use("/api/cars", router);
};
