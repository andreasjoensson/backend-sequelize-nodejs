/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - Make
 *         - Model
 *         - Year
 *         - RentalRate
 *       properties:
 *         CarID:
 *           type: integer
 *           description: The auto-generated id of the car
 *         Make:
 *           type: string
 *           description: The make of the car
 *         Model:
 *           type: string
 *           description: The model of the car
 *         Year:
 *           type: integer
 *           description: The manufacturing year of the car
 *         RentalRate:
 *           type: number
 *           format: decimal
 *           description: The rental rate per day for the car
 *       example:
 *         CarID: 1
 *         Make: Toyota
 *         Model: Corolla
 *         Year: 2020
 *         RentalRate: 50.00
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The car was successfully created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a single car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the car to retrieve
 *     responses:
 *       200:
 *         description: Details of the car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The car was updated successfully
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the car to delete
 *     responses:
 *       200:
 *         description: The car was deleted successfully
 *       404:
 *         description: Car not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


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
