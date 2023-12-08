const {
  createLocationMG,
  getAllLocationsMG,
  findLocationMG,
  updateLocationMG,
  deleteLocationMG,
  deleteAllLocationsMG,
  findAllPublishedLocationsMG,
} = require("../services/mongodb/location.service");
const {
  createLocationNeo4j,
  getAllLocationsNeo4j,
  findLocationNeo4j,
  updateLocationNeo4j,
  deleteLocationNeo4j,
  deleteAllLocationsNeo4j,
  findAllPublishedLocationsNeo4j,
} = require("../services/neo4j/location.service");
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
exports.create = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await createLocationMG(req.body);
        break;
      case "sequelize":
        result = await createLocationSQ(req.body);
        break;
      case "neo4j":
        result = await createLocationNeo4j(req.body);
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

// Retrieve all Locations from the database
exports.findAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await getAllLocationsMG();
        break;
      case "sequelize":
        result = await getAllLocationsSQ();
        break;
      case "neo4j":
        result = await getAllLocationsNeo4j();
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

// Find a single Location by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findLocationMG(id);
        break;
      case "sequelize":
        result = await findLocationSQ(id);
        break;
      case "neo4j":
        result = await findLocationNeo4j(id);
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

// Update a Location by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await updateLocationMG(id, req.body);
        break;
      case "sequelize":
        result = await updateLocationSQ(id, req.body);
        break;
      case "neo4j":
        result = await updateLocationNeo4j(id, req.body);
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

// Delete a Location by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteLocationMG(id);
        break;
      case "sequelize":
        result = await deleteLocationSQ(id);
        break;
      case "neo4j":
        result = await deleteLocationNeo4j(id);
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

// Delete all Locations from the database
exports.deleteAll = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await deleteAllLocationsMG();
        break;
      case "sequelize":
        result = await deleteAllLocationsSQ();
        break;
      case "neo4j":
        result = await deleteAllLocationsNeo4j();
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

// Find all published Locations
exports.findAllPublished = async (req, res) => {
  const selectedDatabase = req.headers["database-type"];

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await findAllPublishedLocationsMG();
        break;
      case "sequelize":
        result = await findAllPublishedLocationsSQ();
        break;
      case "neo4j":
        result = await findAllPublishedLocationsNeo4j();
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
