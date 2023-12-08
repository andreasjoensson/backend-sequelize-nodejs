const loginMongo = require("../services/mongodb/auth.service");
const loginNeo4j = require("../services/neo4j/auth.service");
const { loginSQ } = require("../services/sequelize/auth.service");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  try {
    let result;
    switch (selectedDatabase) {
      case "mongodb":
        result = await loginMongo(email, password);
        break;
      case "sequelize":
        result = await loginSQ(email, password);
        break;
      case "neo4j":
        result = await loginNeo4j(email, password);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid database type specified" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
