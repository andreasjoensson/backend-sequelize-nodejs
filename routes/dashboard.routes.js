/**
 * @swagger
 * components:
 *   schemas:
 *     StatsResponse:
 *       type: object
 *       properties:
 *         CustomerID:
 *           type: integer
 *           description: The ID of the customer
 *         FirstName:
 *           type: string
 *           description: The first name of the customer
 *         LastName:
 *           type: string
 *           description: The last name of the customer
 *         Email:
 *           type: string
 *           format: email
 *           description: The email address of the customer
 *         Phone:
 *           type: string
 *           description: The phone number of the customer
 *         Address:
 *           type: string
 *           description: The address of the customer
 *         RentalID:
 *           type: integer
 *           description: The ID of the rental
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
 *           description: The ID of the car
 *         Make:
 *           type: string
 *           description: The make of the car
 *         Model:
 *           type: string
 *           description: The model of the car
 *         Year:
 *           type: integer
 *           description: The year of the car
 *         RentalRate:
 *           type: number
 *           format: decimal
 *           description: The rental rate of the car
 *       example:
 *         CustomerID: 1
 *         FirstName: John
 *         LastName: Doe
 *         Email: johndoe@example.com
 *         Phone: 1234567890
 *         Address: 123 Main St
 *         RentalID: 2
 *         RentalDate: 2023-01-01
 *         ReturnDate: 2023-01-10
 *         CarID: 3
 *         Make: Toyota
 *         Model: Corolla
 *         Year: 2020
 *         RentalRate: 50.00
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Retrieve statistics and information
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of customers with their rental and car information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


const { authenticateToken, checkRole } = require("../auth/authMiddleware.js");

module.exports = (app) => {
  const dashboard = require("../controllers/dashboard.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.get(
    "/",
    authenticateToken,
    checkRole(["ApplicationUser", "DatabaseAdmin"]),
    dashboard.findInfo
  );


  app.use("/api/stats", router);

};