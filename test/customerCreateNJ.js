const { initializeNeo4jDriver } = require("../config/neo4j.config");
const bcrypt = require("bcrypt");

const createCustomersWithRolesNeo4j = async (customersWithRoles) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    for (const customerData of customersWithRoles) {
      const { firstName, lastName, email, password, roles } = customerData;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the customer node in Neo4j
      const queryCreateCustomer = `
        MERGE (c:Customer {
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          password: $password
        })
        RETURN c
      `;

      const createdCustomer = await session.run(queryCreateCustomer, {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const customerId = createdCustomer.records[0].get("c").identity.low;

      // Create or match role nodes and connect to the customer node
      for (const roleName of roles) {
        const queryConnectRole = `
          MERGE (r:Role { roleName: $roleName })
          WITH r
          MATCH (c:Customer)
          WHERE ID(c) = $customerId
          MERGE (c)-[:HAS_ROLE]->(r)
        `;

        await session.run(queryConnectRole, { roleName, customerId });
      }
    }

    console.log("Customers with roles created successfully in Neo4j!");
  } catch (error) {
    console.error("Error creating customers with roles in Neo4j:", error);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

module.exports = createCustomersWithRolesNeo4j;
