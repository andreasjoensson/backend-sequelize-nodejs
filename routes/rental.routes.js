/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - RentalDate
 *       properties:
 *         RentalID:
 *           type: integer
 *           description: The auto-generated id of the rental
 *         RentalDate:
 *           type: string
 *           format: date
 *           description: The date when the rental was made
 *         ReturnDate:
 *           type: string
 *           format: date
 *           description: The date when the rental is to be returned
 *         CarID:
 *           type: integer
 *           description: The ID of the car being rented
 *         CustomerID:
 *           type: integer
 *           description: The ID of the customer renting the car
 *         LocationID:
 *           type: integer
 *           description: The ID of the location from where the rental is made
 *       example:
 *         RentalID: 1
 *         RentalDate: 2023-01-01
 *         ReturnDate: 2023-01-10
 *         CarID: 5
 *         CustomerID: 2
 *         LocationID: 3
 */

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       201:
 *         description: The rental was successfully created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Retrieve all rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/published:
 *   get:
 *     summary: Retrieve all published rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of published rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: Retrieve a single rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental to retrieve
 *     responses:
 *       200:
 *         description: Details of the rental
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Rental not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   put:
 *     summary: Update a rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       200:
 *         description: The rental was updated successfully
 *       404:
 *         description: Rental not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   delete:
 *     summary: Delete a rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental to delete
 *     responses:
 *       200:
 *         description: The rental was deleted successfully
 *       404:
 *         description: Rental not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals:
 *   delete:
 *     summary: Delete all rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: All rentals were deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


const { authenticateToken, checkRole } = require("../auth/authMiddleware.js");

module.exports = (app) => {
  const rentals = require("../controllers/rentals.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    rentals.create
  );

  // Retrieve all rentals
  router.get(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    rentals.findAll
  );

  // Retrieve all published rentals
  router.get(
    "/published",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    rentals.findAllPublished
  );

  // Retrieve a single Tutorial with id
  router.get(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ReadOnlyUser", "ApplicationUser"]),
    rentals.findOne
  );

  // Update a Tutorial with id
  router.put(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    rentals.update
  );

  // Delete a Tutorial with id
  router.delete(
    "/:id",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    rentals.delete
  );

  // Delete all rentals
  router.delete(
    "/",
    authenticateToken,
    checkRole(["DatabaseAdmin", "ApplicationUser"]),
    rentals.deleteAll
  );

  app.use("/api/rentals", router);
};
