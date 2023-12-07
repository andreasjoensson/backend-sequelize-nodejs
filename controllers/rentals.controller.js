const {
  createRentalSQ,
  getAllRentalsSQ,
  findRentalSQ,
  updateRentalSQ,
  deleteRentalSQ,
  deleteAllRentalsSQ,
  findAllPublishedRentalsSQ,
} = require("../services/sequelize/rental.service");

// Create and Save a new Rental
exports.create = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return createRentalSQ(req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Retrieve all Rentals from the database
exports.findAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return getAllRentalsSQ();
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find a single Rental by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findRentalSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Update a Rental by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return updateRentalSQ(id, req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete a Rental by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteRentalSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete all Rentals from the database
exports.deleteAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteAllRentalsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find all published Rentals
exports.findAllPublished = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findAllPublishedRentalsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};
