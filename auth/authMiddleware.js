const jwt = require("jsonwebtoken");
const { Customer } = require("../models"); // Import your User model

const checkRole = (roles) => {
  return (req, res, next) => {
    // Retrieve user roles from the request (assuming it's added after login)
    const userRoles = req.user.roles; // Change 'roles' to match the actual field in your request

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
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from the Authorization header

  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Verify and decode the token using your secret key
    const user = await Customer.findByPk(decoded.UserID); // Assuming UserID is part of the token payload

    if (!user) {
      return res.sendStatus(401); // Unauthorized if user not found
    }

    // Attach user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden if token is invalid
  }
};

module.exports = { checkRole, authenticateToken };
