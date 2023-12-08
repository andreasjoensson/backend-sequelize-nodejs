const {
  createRentalMG,
  getAllRentalsMG,
  findRentalMG,
  updateRentalMG,
  deleteRentalMG,
  deleteAllRentalsMG,
  findAllPublishedRentalsMG,
} = require("../services/mongodb/rental.service");
const {
  createRentalNJ,
  getAllRentalsNJ,
  findRentalNJ,
  updateRentalNJ,
  deleteRentalNJ,
  deleteAllRentalsNJ,
  findAllPublishedRentalsNJ,
} = require("../services/neo4j/rental.service");
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
exports.create = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await createRentalMG(req.body);
        break;
      case "sequelize":
        result = await createRentalSQ(req.body);
        break;
      case "neo4j":
        result = await createRentalNJ(req.body);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Rentals from the database
exports.findAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await getAllRentalsMG();
        break;
      case "sequelize":
        result = await getAllRentalsSQ();
        break;
      case "neo4j":
        result = await getAllRentalsNJ();
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a single Rental by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findRentalMG(id);
        break;
      case "sequelize":
        result = await findRentalSQ(id);
        break;
      case "neo4j":
        result = await findRentalNJ(id);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Rental by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await updateRentalMG(id, req.body);
        break;
      case "sequelize":
        result = await updateRentalSQ(id, req.body);
        break;
      case "neo4j":
        result = await updateRentalNJ(id, req.body);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Rental by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteRentalMG(id);
        break;
      case "sequelize":
        result = await deleteRentalSQ(id);
        break;
      case "neo4j":
        result = await deleteRentalNJ(id);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all Rentals from the database
exports.deleteAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteAllRentalsMG();
        break;
      case "sequelize":
        result = await deleteAllRentalsSQ();
        break;
      case "neo4j":
        result = await deleteAllRentalsNJ();
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find all published Rentals
exports.findAllPublished = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findAllPublishedRentalsMG();
        break;
      case "sequelize":
        result = await findAllPublishedRentalsSQ();
        break;
      case "neo4j":
        result = await findAllPublishedRentalsNJ();
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
