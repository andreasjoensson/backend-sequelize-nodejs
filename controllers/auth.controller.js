const loginMongo = require("../services/mongodb/auth.service");
const loginNeo4j = require("../services/neo4j/auth.service");
const { loginSQ } = require("../services/sequelize/auth.service");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const selectedDatabase = req.headers["database-type"]; // Retrieve the 'Database-Type' header

  switch (selectedDatabase) {
    case "mongodb":
      res.status(200).json(await loginMongo(email, password));
      break;
    case "sequelize":
      res.status(200).json(await loginSQ(email, password));
      break;
    case "neo4j":
      res.status(200).json(await loginNeo4j(email, password));
      break;
    default:
      // Handle default case
      break;
  }
};
