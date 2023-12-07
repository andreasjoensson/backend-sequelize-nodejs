const {
  createCarSQ,
  getAllCarsSQ,
  findCarSQ,
  updateCarSQ,
  deleteCarSQ,
  deleteAllCarsSQ,
  findAllPublishedCarsSQ,
} = require("../services/sequelize/car.service");

// Create and Save a new Car
exports.create = (req, res) => {
  const { Make, Model, Year, RentalRate, selectedDatabase } = req.body;

  // Validate request
  if (!Make || !Model || !Year || !RentalRate) {
    return res
      .status(400)
      .send({ message: "Required fields cannot be empty!" });
  }

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return createCarSQ(req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Retrieve all Cars from the database
exports.findAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return getAllCarsSQ();
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find a single Car by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findCarSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Update a Car by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return updateCarSQ(id, req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete a Car by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteCarSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete all Cars from the database
exports.deleteAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteAllCarsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find all published Cars
exports.findAllPublished = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findAllPublishedCarsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};
