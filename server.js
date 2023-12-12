const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Bilopedia 3 Databaser API",
      version: "0.1.0",
      description:
        "Det her er en simpel biludlejnings API, som er lavet til at demonstrere forskellige databaser.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Bilopedia",
        url: "https://bilopedia.dk",
        email: "andreas.ecuador@live.dk",
      },
    },
    servers: [
      {
        url: "https://crud-backend-my25.onrender.com",
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const db = require("./models/sequelize");

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
require("./routes/dashboard.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
