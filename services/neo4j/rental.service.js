const { initializeNeo4jDriver } = require("../../config/neo4j.config");

// Create Rental Node
const createRentalNJ = async (rentalData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.writeTransaction(async (txc) => {
      const query = `
        CREATE (r:Rental $rentalData)
        RETURN r
      `;
      return await txc.run(query, { rentalData });
    });

    return result.records[0].get("r").properties;
  } catch (error) {
    throw new Error(`Error creating Rental: ${error.message}`);
  }
};

// Get all Rentals
const getAllRentalsNJ = async () => {
  let driver;
  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    const result = await session.readTransaction(async (txc) => {
      const query = `
        MATCH (r:Rental)
        RETURN r
      `;
      return await txc.run(query);
    });

    return result.records.map((record) => record.get("r").properties);
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
      return await txc.run(query, { id: neo4j.int(id) });
    });

    if (result.summary.counters.nodesDeleted() !== 1) {
      throw new Error(
        `Cannot delete Rental with id=${id}. Rental may not exist!`
      );
    }

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
