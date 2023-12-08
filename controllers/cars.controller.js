const {
  createCarMG,
  getAllCarsMG,
  findCarMG,
  updateCarMG,
  deleteCarMG,
  deleteAllCarsMG,
  findAllPublishedCarsMG,
} = require("../services/mongodb/car.service");
const {
  createCarNeo4j,
  getAllCarsNeo4j,
  findCarNeo4j,
  updateCarNeo4j,
  deleteCarNeo4j,
  findAllPublishedCarsNeo4j,
} = require("../services/neo4j/car.service");
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
exports.create = async (req, res) => {
  const { Make, Model, Year, RentalRate } = req.body;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  // Validate request
  if (!Make || !Model || !Year || !RentalRate) {
    return res
      .status(400)
      .json({ message: "Required fields cannot be empty!" });
  }

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await createCarMG(req.body);
        break;
      case "sequelize":
        result = await createCarSQ(req.body);
        break;
      case "neo4j":
        result = await createCarNeo4j(req.body);
        break;
      default:
        // Handle default case
        break;
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Retrieve all Cars from the database
exports.findAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await getAllCarsMG();
        break;
      case "sequelize":
        result = await getAllCarsSQ();
        break;
      case "neo4j":
        result = await getAllCarsNeo4j();
        break;
      default:
        // Handle default case
        break;
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Find a single Car by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findCarMG(id);
        break;
      case "sequelize":
        result = await findCarSQ(id);
        break;
      case "neo4j":
        result = await findCarNeo4j(id);
        break;
      default:
        // Handle default case
        break;
    }

    if (!result) {
      return res.status(404).json({ message: `Car with id ${id} not found.` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a Car by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await updateCarMG(id, req.body);
        break;
      case "sequelize":
        result = await updateCarSQ(id, req.body);
        break;
      case "neo4j":
        result = await updateCarNeo4j(id, req.body);
        break;
      default:
        // Handle default case
        break;
    }

    if (!result) {
      return res
        .status(404)
        .json({ message: `Cannot update Car with id=${id}.` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a Car by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteCarMG(id);
        break;
      case "sequelize":
        result = await deleteCarSQ(id);
        break;
      case "neo4j":
        result = await deleteCarNeo4j(id);
        break;
      default:
        // Handle default case
        break;
    }

    if (!result) {
      return res
        .status(404)
        .json({ message: `Cannot delete Car with id=${id}.` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete all Cars from the database
exports.deleteAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteAllCarsMG();
        break;
      case "sequelize":
        result = await deleteAllCarsSQ();
        break;
      case "neo4j":
        // Neo4j delete all cars function
        break;
      default:
        // Handle default case
        break;
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Find all published Cars
exports.findAllPublished = async (req, res) => {
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findAllPublishedCarsMG();
        break;
      case "sequelize":
        result = await findAllPublishedCarsSQ();
        break;
      case "neo4j":
        result = await findAllPublishedCarsNeo4j();
        break;
      default:
        // Handle default case
        break;
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
