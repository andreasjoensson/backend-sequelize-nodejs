/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - Name
 *         - Address
 *       properties:
 *         LocationID:
 *           type: integer
 *           description: The auto-generated id of the location
 *         Name:
 *           type: string
 *           description: The name of the location
 *         Address:
 *           type: string
 *           description: The address of the location
 *       example:
 *         LocationID: 1
 *         Name: Main Street Apartment
 *         Address: 123 Main St
 */

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Create a new rental location
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: The rental location was successfully created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Retrieve all rental locations
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of rental locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/published:
 *   get:
 *     summary: Retrieve all published rental locations
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of published rental locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: Retrieve a single rental location by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental location
 *     responses:
 *       200:
 *         description: Details of the rental location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Rental location not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   put:
 *     summary: Update a rental location by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: The rental location was updated successfully
 *       404:
 *         description: Rental location not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   delete:
 *     summary: Delete a rental location by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the rental location to delete
 *     responses:
 *       200:
 *         description: The rental location was deleted successfully
 *       404:
 *         description: Rental location not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rentals:
 *   delete:
 *     summary: Delete all rental locations
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: All rental locations were deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


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
