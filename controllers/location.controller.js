const {
  createLocationSQ,
  getAllLocationsSQ,
  findLocationSQ,
  updateLocationSQ,
  deleteLocationSQ,
  deleteAllLocationsSQ,
  findAllPublishedLocationsSQ,
} = require("../services/sequelize/location.service");

// Create and Save a new Location
exports.create = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return createLocationSQ(req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Retrieve all Locations from the database
exports.findAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return getAllLocationsSQ();
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find a single Location by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findLocationSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Update a Location by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return updateLocationSQ(id, req.body);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete a Location by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteLocationSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Delete all Locations from the database
exports.deleteAll = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return deleteAllLocationsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};

// Find all published Locations
exports.findAllPublished = (req, res) => {
  const { selectedDatabase } = req.body;

  switch (selectedDatabase) {
    case "mongodb":
      break;
    case "sequelize":
      return findAllPublishedLocationsSQ(id);
    case "neo4j":
      break;
    default:
      // Handle default case
      break;
  }
};
