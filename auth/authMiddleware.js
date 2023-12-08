const jwt = require("jsonwebtoken");
const db = require("../models/sequelize"); // Import your Sequelize models
const { initializeNeo4jDriver } = require("../config/neo4j.config");
const Customer = db.Customer;
const Role = db.Role;

const checkRole = (roles) => {
  return (req, res, next) => {
    const selectedDatabase = req.headers["database-type"];
    let userRoles = req.user.roles;

    switch (selectedDatabase) {
      case "sequelize":
        userRoles = userRoles.map((role) => role.RoleName);
        break;
      case "neo4j":
        userRoles = userRoles.map((role) => role);
        break;
      case "mongodb":
        userRoles = userRoles.map((role) => role.RoleName);
        break;
      default:
        // Handle default case
        break;
    }

    console.log("userRoles", userRoles);
    // Check if the user has any of the required roles
    const hasRole = roles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
      });
    }

    // User has the required role, proceed to the next middleware/controller
    next();
  };
};

const authenticateTokenSQ = async (decoded) => {
  try {
    const user = await Customer.findByPk(decoded.CustomerID, {
      include: [{ model: Role, through: "CustomerRoles" }], // Include the Role model with through table
    });

    const userData = user.get({ plain: true }); // Use get() method with plain: true option

    if (!userData) {
      return res.sendStatus(401); // Unauthorized if user not found
    }

    // Attach user information to the request object
    return userData;
  } catch (err) {
    return res.sendStatus(403); // Forbidden if token is invalid
  }
};

const authenticateTokenNeo4j = async (decoded) => {
  try {
    const driver = await initializeNeo4jDriver(); // Initialize your Neo4j driver
    const session = driver.session();
    console.log("decoded", decoded);
    // Fetch user details based on the decoded token using a Cypher query
    const neo4jResult = await session.run(
      `
      MATCH (u:Customer)-[:HAS_ROLE]->(role)
      WHERE ID(u) = $id
      RETURN u, collect(role) as roles
      `,
      { id: decoded.CustomerID }
    );

    if (neo4jResult.records.length === 0) {
      throw new Error("User not found in Neo4j");
    }

    // Extract user data and roles from the result
    const userData = neo4jResult.records[0].get("u").properties;
    const roles = neo4jResult.records[0]
      .get("roles")
      .map((role) => role.properties.roleName);
    // Set req.user object with the user data and roles

    await session.close();
    await driver.close();

    return { ...userData, roles };
  } catch (err) {
    console.error(err);
    return res.sendStatus(403); // Forbidden if token is invalid or user not found
  }
};

const authenticateTokenMongo = async () => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    // Fetch user details including roles based on the decoded token
    const user = await Customer.findOne({
      CustomerID: decoded.CustomerID,
    }).populate("roles");

    if (!user) {
      return res.sendStatus(401); // Unauthorized if user not found
    }

    // Attach user information to the request object
    return { ...user._doc, roles: user.roles.map((role) => role.RoleName) };
  } catch (err) {
    console.error(err);
    return res.sendStatus(403); // Forbidden if token is invalid or user not found
  }
};

module.exports = { authenticateTokenMongo };

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const selectedDatabase = req.headers["database-type"];

  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  const token = authHeader.split(" ")[1]; // Get the token from the Authorization header

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Verify and decode the token using your secret key

    let user;
    switch (selectedDatabase) {
      case "sequelize":
        user = await authenticateTokenSQ(decoded);
        break;
      case "mongodb":
        user = await authenticateTokenMongo(decoded);
        break;
      case "neo4j":
        user = await authenticateTokenNeo4j(decoded);
        break;
      default:
        // Handle default case
        break;
    }

    if (!user) {
      return res.sendStatus(403); // Forbidden if user not found
    }

    console.log("user", user);
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden if token is invalid
  }
};

// Modify the authenticateTokenSQ, authenticateTokenMongo, and authenticateTokenNeo4j functions to return the user object instead of setting req.user

module.exports = { checkRole, authenticateToken };
