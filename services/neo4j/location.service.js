const { initializeNeo4jDriver } = require("../../config/neo4j.config");

const createLocationNeo4j = async (LocationData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryCreateLocation = `
      CREATE (l:Location $LocationData)
      RETURN l
    `;

    const result = await session.run(queryCreateLocation, { LocationData });
    const createdLocation = result.records[0].get("l");

    await session.close();
    await driver.close();

    return createdLocation;
  } catch (error) {
    throw new Error(`Error creating Location in Neo4j: ${error.message}`);
  }
};

const getAllLocationsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryGetAllLocations = `
      MATCH (l:Location)
      RETURN l, ID(l) as id
    `;

    const result = await session.run(queryGetAllLocations);
    const allLocations = result.records.map(
      (record) => {
       return {
        ...record.get("l").properties,
        LocationID: record.get("id").low,
       } 
      });

    await session.close();
    await driver.close();

    return allLocations;
  } catch (error) {
    throw new Error(`Error retrieving Locations from Neo4j: ${error.message}`);
  }
};

const findLocationNeo4j = async (id) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryFindLocation = `
      MATCH (l:Location)
      WHERE ID(l) = $id
      RETURN l
    `;

    const result = await session.run(queryFindLocation, { id: parseInt(id) });
    const foundLocation = result.records[0] ? result.records[0].get("l") : null;

    if (!foundLocation) {
      throw new Error(`Location with id ${id} not found in Neo4j.`);
    }

    await session.close();
    await driver.close();

    return foundLocation;
  } catch (error) {
    throw new Error(
      `Error retrieving Location with id ${id} from Neo4j: ${error.message}`
    );
  }
};

const updateLocationNeo4j = async (id, LocationData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryUpdateLocation = `
      MATCH (l:Location)
      WHERE ID(l) = $id
      SET l += $LocationData
      RETURN l
    `;

    const result = await session.run(queryUpdateLocation, {
      id: parseInt(id),
      LocationData,
    });
    const updatedLocation = result.records[0]
      ? result.records[0].get("l")
      : null;

    if (!updatedLocation) {
      throw new Error(
        `Cannot update Location with id=${id}. Location may not exist or request body is empty!`
      );
    }

    await session.close();
    await driver.close();

    return { message: "Location was updated successfully." };
  } catch (error) {
    throw new Error(
      `Error updating Location with id ${id} in Neo4j: ${error.message}`
    );
  }
};

const deleteLocationNeo4j = async (id) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryDeleteLocation = `
      MATCH (l:Location)
      WHERE ID(l) = $id
      DELETE l
    `;

    const result = await session.run(queryDeleteLocation, { id: parseInt(id) });
    const deletedCount = result.summary.counters._stats.nodesDeleted;

    if (deletedCount === 0) {
      throw new Error(
        `Cannot delete Location with id=${id}. Location may not exist!`
      );
    }

    await session.close();
    await driver.close();

    return { message: "Location was deleted successfully!" };
  } catch (error) {
    throw new Error(
      `Error deleting Location with id ${id} from Neo4j: ${error.message}`
    );
  }
};

const deleteAllLocationsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryDeleteAllLocations = `
      MATCH (l:Location)
      DELETE l
    `;

    await session.run(queryDeleteAllLocations);

    await session.close();
    await driver.close();

    return { message: "All Locations were deleted successfully!" };
  } catch (error) {
    throw new Error(
      `Error deleting all Locations from Neo4j: ${error.message}`
    );
  }
};

const findAllPublishedLocationsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const queryFindAllPublishedLocations = `
      MATCH (l:Location)
      WHERE l.published = true
      RETURN l
    `;

    const result = await session.run(queryFindAllPublishedLocations);
    const publishedLocations = result.records.map((record) => record.get("l"));

    await session.close();
    await driver.close();

    return publishedLocations;
  } catch (error) {
    throw new Error(
      `Error retrieving published Locations from Neo4j: ${error.message}`
    );
  }
};

module.exports = {
  createLocationNeo4j,
  getAllLocationsNeo4j,
  findLocationNeo4j,
  updateLocationNeo4j,
  deleteLocationNeo4j,
  deleteAllLocationsNeo4j,
  findAllPublishedLocationsNeo4j,
};
