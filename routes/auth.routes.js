/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: user@example.com
 *         password: yourpassword
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *             email:
 *               type: string
 *               format: email
 *           description: Details of the authenticated user
 *         token:
 *           type: string
 *           description: JWT token for authorization
 *       example:
 *         user:
 *           userId: 1
 *           email: user@example.com
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: User sign-in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Authentication failed
 *       500:
 *         description: Server error
 */


const { signin } = require("../controllers/auth.controller");

module.exports = (app) => {
  var router = require("express").Router();
  router.post("/sign-in", signin);

  app.use("/api/auth", router);
};
