const { initializeNeo4jDriver } = require("../../config/neo4j.config");

const createRentalNJ = async (rentalData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const carId = parseInt(rentalData.CarID); // Assuming these are Neo4j's internal IDs
    const customerId = parseInt(rentalData.CustomerID);
    const locationId = parseInt(rentalData.LocationID);

    // Create the Rental node
    let createRentalQuery = `
      CREATE (r:Rental $rentalData)
      RETURN r
    `;
    let rentalResult = await session.writeTransaction(txc =>
      txc.run(createRentalQuery, { rentalData })
    );
    let rentalNode = rentalResult.records[0].get('r');

    // Create relationships in separate transactions
    const createRelationships = async (relationshipQuery) => {
      console.log('rentalId', rentalNode.identity)
      return await session.writeTransaction(txc => txc.run(relationshipQuery, {
        carId, customerId, locationId, rentalId: rentalNode.identity
      }));
    };

    await createRelationships(`
      MATCH (r:Rental), (c:Car)
      WHERE ID(r) = $rentalId AND ID(c) = $carId
      CREATE (r)-[:RENTED_CAR]->(c)
    `);

    await createRelationships(`
      MATCH (r:Rental), (cust:Customer)
      WHERE ID(r) = $rentalId AND ID(cust) = $customerId
      CREATE (r)-[:RENTED_BY]->(cust)
    `);

    await createRelationships(`
      MATCH (r:Rental), (loc:Location)
      WHERE ID(r) = $rentalId AND ID(loc) = $locationId
      CREATE (r)-[:RENTED_AT]->(loc)
    `);

    console.log('Rental creation result:', rentalNode);

    return rentalNode.properties;
  } catch (error) {
    console.log('Error:', error)
    throw new Error(`Error creating Rental with associations: ${error.message}`);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};




const getAllRentalsNJ = async () => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.readTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        RETURN r, ID(r) as id
      `;
      return await txc.run(query);
    });

    return result.records.map((record) => {
      return {
        ...record.get("r").properties,
        RentalID: record.get("id").low,
      };
    });
  } catch (error) {
    throw new Error(`Error retrieving Rentals: ${error.message}`);
  }
};


// Find Rental by ID
const findRentalNJ = async (id) => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.readTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        WHERE ID(r) = $id
        RETURN r
      `;
      return await txc.run(query, { id: neo4j.int(id) });
    });

    if (result.records.length === 0) {
      throw new Error(`Rental with id ${id} not found.`);
    }

    return result.records[0].get("r").properties;
  } catch (error) {
    throw new Error(`Error retrieving Rental with id ${id}: ${error.message}`);
  }
};

// Update Rental by ID
const updateRentalNJ = async (id, rentalData) => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.writeTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        WHERE ID(r) = $id
        SET r += $rentalData
        RETURN r
      `;
      return await txc.run(query, { id: neo4j.int(id), rentalData });
    });

    if (result.records.length === 0) {
      throw new Error(
        `Cannot update Rental with id=${id}. Rental may not exist or request body is empty!`
      );
    }

    return { message: "Rental was updated successfully." };
  } catch (error) {
    throw new Error(`Error updating Rental with id ${id}: ${error.message}`);
  }
};

// Delete Rental by ID
const deleteRentalNJ = async (id) => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.writeTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        WHERE ID(r) = $id
        DELETE r
      `;
      return await txc.run(query, { id: parseInt(id) });
    });

  

    return { message: "Rental was deleted successfully!" };
  } catch (error) {
    throw new Error(`Error deleting Rental with id ${id}: ${error.message}`);
  }
};

// Delete all Rentals
const deleteAllRentalsNJ = async () => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.writeTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        WITH r
        DETACH DELETE r
      `;
      return await txc.run(query);
    });

    return {
      message: `${result.summary.counters.nodesDeleted} Rentals were deleted successfully!`,
    };
  } catch (error) {
    throw new Error(
      `Error occurred while removing all Rentals: ${error.message}`
    );
  }
};

// Find all published Rentals
const findAllPublishedRentalsNJ = async () => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.readTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        WHERE r.published = true
        RETURN r
      `;
      return await txc.run(query);
    });

    return result.records.map((record) => record.get("r").properties);
  } catch (error) {
    throw new Error(`Error retrieving published Rentals: ${error.message}`);
  }
};

module.exports = {
  createRentalNJ,
  getAllRentalsNJ,
  findRentalNJ,
  updateRentalNJ,
  deleteRentalNJ,
  deleteAllRentalsNJ,
  findAllPublishedRentalsNJ,
};
