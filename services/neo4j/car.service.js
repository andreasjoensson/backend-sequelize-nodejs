const { initializeNeo4jDriver } = require("../../config/neo4j.config");

const createCarNeo4j = async (carData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      CREATE (c:Car $carData)
      RETURN c
    `;

    const result = await session.run(query, { carData });
    const newCar = result.records[0].get("c").properties;
    session.close();

    return newCar;
  } catch (error) {
    throw new Error(`Error creating car in Neo4j: ${error.message}`);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const getAllCarsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car)
      RETURN c
    `;

    const result = await session.run(query);
    const allCars = result.records.map((record) => record.get("c").properties);
    session.close();

    console.log("allCars", allCars);

    return allCars;
  } catch (error) {
    throw new Error(`Error retrieving cars in Neo4j: ${error.message}`);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const findCarNeo4j = async (id) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car { id: $id })
      RETURN c
    `;

    const result = await session.run(query, { id });
    const car = result.records[0].get("c").properties;
    session.close();

    return car;
  } catch (error) {
    throw new Error(
      `Error retrieving car with id ${id} in Neo4j: ${error.message}`
    );
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const updateCarNeo4j = async (id, carData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car { id: $id })
      SET c += $carData
      RETURN c
    `;

    const result = await session.run(query, { id, carData });
    const updatedCar = result.records[0].get("c").properties;
    session.close();

    return updatedCar;
  } catch (error) {
    throw new Error(
      `Error updating car with id ${id} in Neo4j: ${error.message}`
    );
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const deleteCarNeo4j = async (id) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car { id: $id })
      DELETE c
    `;

    await session.run(query, { id });
    session.close();

    return { message: `Car with id ${id} was deleted successfully!` };
  } catch (error) {
    throw new Error(
      `Error deleting car with id ${id} in Neo4j: ${error.message}`
    );
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const deleteAllCarsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car)
      DELETE c
    `;

    await session.run(query);
    session.close();

    return { message: `All cars were deleted successfully!` };
  } catch (error) {
    throw new Error(`Error deleting all cars in Neo4j: ${error.message}`);
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

const findAllPublishedCarsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (c:Car { published: true })
      RETURN c
    `;

    const result = await session.run(query);
    const publishedCars = result.records.map(
      (record) => record.get("c").properties
    );
    session.close();

    return publishedCars;
  } catch (error) {
    throw new Error(
      `Error retrieving published cars in Neo4j: ${error.message}`
    );
  } finally {
    if (driver) {
      await driver.close(); // Close the Neo4j driver
    }
  }
};

// exports for the functions
module.exports = {
  createCarNeo4j,
  getAllCarsNeo4j,
  findCarNeo4j,
  updateCarNeo4j,
  deleteCarNeo4j,
  deleteAllCarsNeo4j,
  findAllPublishedCarsNeo4j,
};
