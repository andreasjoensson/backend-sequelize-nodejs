const getCustomersWithCarsAndRentalsMongo = require("../services/mongodb/dashboard.service");
const getCustomersWithCarsAndRentalsNeo4j = require("../services/neo4j/dashboard.service");
const GetCustomersWithCarsAndRentals = require("../services/sequelize/dashboard.service");

// Find a single Car by ID
exports.findInfo = async (req, res) => {
    const id = req.user.id
    const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header
  
    try {
      let result;
      switch (selectedDatabase) {
        case "mongodb":
          result = await getCustomersWithCarsAndRentalsMongo(id);
          break;
        case "sequelize":
          result = await GetCustomersWithCarsAndRentals(id);
          break;
        case "neo4j":
          result = await getCustomersWithCarsAndRentalsNeo4j(id);
          break;
        default:
          // Handle default case
          break;
      }

      console.log(result);
  
      if (!result) {
        return res.status(404).json({ message: `Car with id ${id} not found.` });
      }
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };