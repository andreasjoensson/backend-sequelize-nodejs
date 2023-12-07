const db = require("../models/sequelize"); // Import your Sequelize models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customer = db.Customer;
const Role = db.Role;

module.exports = (app) => {
  var router = require("express").Router();

  // Retrieve all Tutorials
  router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    // Find customer by email
    Customer.findOne({ where: { email } })
      .then((customer) => {
        if (!customer) {
          return res.status(404).json({ message: "Customer not found." });
        }

        // Compare password
        bcrypt.compare(password, customer.Password, async (err, result) => {
          if (err || !result) {
            return res
              .status(401)
              .json({ message: "Invalid email or password." });
          }

          // Generate token
          const token = jwt.sign(
            {
              CustomerID: customer.CustomerID,
              Email: customer.Email,
              Role: customer.Role,
            },
            "your-secret-key", // Replace with your secret key for token generation
            { expiresIn: "1h" } // Set token expiration time
          );
          const userRoles = await customer.getRoles();

          res.status(200).json({ token, roles: userRoles });
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message || "Error signing in." });
      });
  });

  app.use("/api/auth", router);
};
