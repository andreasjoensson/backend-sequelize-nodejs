require("dotenv").config();
const neo4j = require("neo4j-driver");

const initializeNeo4jDriver = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = process.env.NEO4J_URI || "neo4j://localhost";
  const USER = process.env.NEO4J_USERNAME || "neo4j";
  const PASSWORD = process.env.NEO4J_PASSWORD || "neo4j";

  let driver;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    await driver.verifyConnectivity(); // Ensure the driver is connected
    console.log("Connection established");
    return driver;
  } catch (err) {
    console.error(`Connection error:\n${err}\nCause: ${err.cause}`);
    throw err;
  }
};

module.exports = {
  initializeNeo4jDriver,
};
