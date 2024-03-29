const { initializeNeo4jDriver } = require("../../config/neo4j.config");

const createCarNeo4j = async (carData) => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    // Create the Car node
    let carQuery = `
      CREATE (c:Car {Make: $Make, Model: $Model, Year: $Year, RentalRate: $RentalRate})
      RETURN c
    `;
    let carResult = await session.run(carQuery, carData);
    let newCar = carResult.records[0].get("c").properties;
    console.log('newCar', newCar)

    // Function to run a query for creating a related node and relationship
    const createRelatedNode = async (query, params) => {
      await session.run(query, params);
    };

    // Create Accessories
    for (const accessory of carData.Accessories || []) {
      let accessoryQuery = `
        MATCH (c:Car) WHERE c.Make = $Make AND c.Model = $Model AND c.Year = $Year
        CREATE (a:Accessory {name: $name, description: $description})-[:BELONGS_TO]->(c)
      `;

      console.log('accessoryQuery', accessory)
      await createRelatedNode(accessoryQuery, { 
        name: accessory.Name, 
        description: accessory.Description, 
        Make: newCar.Make, 
        Model: newCar.Model, 
        Year: newCar.Year 
      });
    }

 // Create Insurance Policies
 if (carData.InsurancePolicy) {
  let insuranceQuery = `
    MATCH (c:Car) WHERE c.Make = $Make AND c.Model = $Model AND c.Year = $Year
    CREATE (i:InsurancePolicy {provider: $provider, policyNumber: $policyNumber, expirationDate: $expirationDate})-[:INSURES]->(c)
  `;
  await createRelatedNode(insuranceQuery, { 
    provider: carData.InsurancePolicy.Provider, 
    policyNumber: carData.InsurancePolicy.PolicyNumber, 
    expirationDate: carData.InsurancePolicy.ExpirationDate, 
    Make: newCar.Make, 
    Model: newCar.Model, 
    Year: newCar.Year 
  });
}

// Create Maintenance Records
for (const record of carData.MaintenanceRecords || []) {
  let maintenanceQuery = `
    MATCH (c:Car) WHERE c.Make = $Make AND c.Model = $Model AND c.Year = $Year
    CREATE (m:MaintenanceRecord {serviceDate: $serviceDate, description: $description, cost: $cost})-[:FOR]->(c)
  `;
  await createRelatedNode(maintenanceQuery, { 
    serviceDate: record.ServiceDate, 
    description: record.Description, 
    cost: record.Cost, 
    Make: newCar.Make, 
    Model: newCar.Model, 
    Year: newCar.Year 
  });
}

// Create Traffic Violations
for (const violation of carData.TrafficViolations || []) {
  let violationQuery = `
    MATCH (c:Car) WHERE c.Make = $Make AND c.Model = $Model AND c.Year = $Year
    CREATE (t:TrafficViolation {dateOfViolation: $dateOfViolation, description: $description, fineAmount: $fineAmount, paid: $paid})-[:VIOLATED_BY]->(c)
  `;
  await createRelatedNode(violationQuery, { 
    dateOfViolation: violation.DateOfViolation, 
    description: violation.Description, 
    fineAmount: violation.FineAmount, 
    paid: 0, 
    Make: newCar.Make, 
    Model: newCar.Model, 
    Year: newCar.Year 
  });
}
    session.close();
    return newCar;
  } catch (error) {
    console.log('error', error)
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
      RETURN c, ID(c) as id
    `;

    const result = await session.run(query);
    const allCars = result.records.map((record) => {
      return {
      ...record.get("c").properties,
      CarID: record.get("id").low,
    }});
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
