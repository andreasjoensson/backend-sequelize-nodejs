const express = require("express");
const cors = require("cors");
const { connect } = require("./config/mongodb.config");

const app = express();

// Define CORS options
let corsOptions = {};

if (process.env.NODE_ENV === "production") {
  // Use a different CORS URL in production
  corsOptions = {
    origin: "https://www.bilopedia.dk", // Replace with your production URL
  };
} else {
  // Default CORS URL for development
  corsOptions = {
    origin: "http://localhost:3000", // Your development URL
  };
}

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models/sequelize");
const createCustomersMongoDB = require("./test/customerCreateMG");
const customersWithRoles = [
  {
    firstName: "App",
    lastName: "User",
    email: "appuser@example.com",
    password: "password123", // Plain password (it will be hashed in the function)
    roles: ["ApplicationUser"],
  },
  {
    firstName: "DB",
    lastName: "Admin",
    email: "dbadmin@example.com",
    password: "password123",
    roles: ["DatabaseAdmin"],
  },
  {
    firstName: "Read",
    lastName: "Only",
    email: "readonly@example.com",
    password: "password123",
    roles: ["ReadOnlyUser"],
  },
  {
    firstName: "Restricted",
    lastName: "User",
    email: "restricted@example.com",
    password: "password123",
    roles: ["RestrictedUser"],
  },
];

connect();

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//createCustomersWithRoles();

require("./routes/cars.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/rental.routes")(app);
require("./routes/location.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
