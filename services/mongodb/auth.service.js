const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/mongodb/customer.model");

const loginMongo = async (email, password) => {
  try {
    // Find customer by email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    // Compare password
    const match = await bcrypt.compare(password, customer.password);

    if (!match) {
      throw new Error("Invalid email or password.");
    }

    // Generate token
    const token = jwt.sign(
      {
        CustomerID: customer._id, // Modify based on your schema
        Email: customer.email, // Modify based on your schema
        // Add other necessary fields for the token
      },
      "your-secret-key", // Replace with your secret key for token generation
      { expiresIn: "1h" } // Set token expiration time
    );

    // You may need to modify this part based on your schema structure
    const userRoles = customer.roles; // Assuming roles are stored in the 'roles' field of the customer document

    return { token, roles: userRoles };
  } catch (error) {
    throw new Error("Error during login in MongoDB: " + error.message);
  }
};

module.exports = loginMongo;
