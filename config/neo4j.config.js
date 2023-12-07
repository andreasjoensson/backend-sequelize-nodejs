require("dotenv").config();
var neo4j = require("neo4j-driver");

(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = process.env.NEO4J_URI || "neo4j://localhost";
  const USER = process.env.NEO4J_USERNAME || "neo4j";
  const PASSWORD = process.env.NEO4J_PASSWORD || "neo4j";
  let driver;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log("Connection established");
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
})();
