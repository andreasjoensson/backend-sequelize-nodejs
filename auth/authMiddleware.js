const jwt = require("jsonwebtoken");
const db = require("../models"); // Import your Sequelize models
const Customer = db.Customer;
const Role = db.Role;

const checkRole = (roles) => {
  return (req, res, next) => {
    const userRoles = req.user.Roles.map((role) => role.RoleName); // Change 'roles' to match the actual field in your request

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

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from the Authorization header

  if (token == null) {
    console.log("token null");
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Verify and decode the token using your secret key
    const user = await Customer.findByPk(decoded.CustomerID, {
      include: [{ model: Role, through: "CustomerRoles" }], // Include the Role model with through table
    });

    const userData = user.get({ plain: true }); // Use get() method with plain: true option

    if (!userData) {
      return res.sendStatus(401); // Unauthorized if user not found
    }

    // Attach user information to the request object
    req.user = userData;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden if token is invalid
  }
};

module.exports = { checkRole, authenticateToken };
