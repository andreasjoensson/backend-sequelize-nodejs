const models = require("../../models/sequelize"); // Import your Sequelize models
const Customer = models.Customer;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginSQ = async (email, password) => {
  try {
    // Find customer by email
    const customer = await Customer.findOne({ where: { Email: email } });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    // Compare password
    const match = await bcrypt.compare(password, customer.Password);

    if (!match) {
      throw new Error("Invalid email or password.");
    }

    // Generate token
    const token = jwt.sign(
      {
        CustomerID: customer.CustomerID,
        Email: customer.Email,
        Role: customer.Role,
      },
      process.env.JWT_SECRET, // Replace with your secret key for token generation
      { expiresIn: "1h" } // Set token expiration time
    );

    const userRoles = await customer.getRoles();

    return { token, roles: userRoles };
  } catch (error) {
    throw new Error("Error during login in Sequelize: " + error.message);
  }
};

exports.loginSQ = loginSQ;
