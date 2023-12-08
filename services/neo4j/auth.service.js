const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { initializeNeo4jDriver } = require("../../config/neo4j.config");
require("dotenv").config();

const loginNeo4j = async (email, password) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();

    const session = driver.session();

    const query = `
    MATCH (c:Customer { email: $email })
    RETURN ID(c) AS neo4jId, c {.email, .password, .roles}
    `;

    const result = await session.run(query, { email });

    if (result.records.length === 0) {
      throw new Error("Customer not found.");
    }

    const customer = result.records[0].get("c");
    const id = result.records[0].get("neo4jId");

    console.log("customer", customer);
    console.log("id", id.low);

    // Compare password
    const match = await bcrypt.compare(password, customer.password);

    if (!match) {
      throw new Error("Invalid email or password.");
    }

    // Generate token
    const token = jwt.sign(
      {
        CustomerID: id.low, // Use the retrieved Neo4j internal ID
        Email: customer.email, // Modify based on your node property name for email
        // Add other necessary fields for the token
      },
      process.env.JWT_SECRET, // Replace with your secret key for token generation
      { expiresIn: "1h" } // Set token expiration time
    );

    const userRoles = customer.roles; // Assuming roles are stored in the 'roles' property of the Customer node

    return { token, roles: userRoles };
  } catch (error) {
    throw new Error("Error during login in Neo4j: " + error.message);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

module.exports = loginNeo4j;
