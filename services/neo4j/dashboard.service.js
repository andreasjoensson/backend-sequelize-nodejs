const { initializeNeo4jDriver } = require("../../config/neo4j.config");



const getCustomersWithCarsAndRentalsNeo4j = async () => {
  let driver;

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();

    const query = `
      MATCH (cust:Customer)
      OPTIONAL MATCH (cust)-[:RENTED_BY]->(r:Rental)
      OPTIONAL MATCH (r)-[:RENTED_CAR]->(car:Car)
      OPTIONAL MATCH (r)-[:RENTED_AT]->(loc:Location)
      RETURN 
        cust.id AS CustomerID,
        cust.firstName AS FirstName,
        cust.lastName AS LastName,
        cust.email AS Email,
        cust.phone AS Phone,
        cust.address AS Address,
        cust.password AS Password,
        r.id AS RentalID,
        r.rentalDate AS RentalDate,
        r.returnDate AS ReturnDate,
        car.id AS CarID,
        car.make AS Make,
        car.model AS Model,
        car.year AS Year,
        car.rentalRate AS RentalRate,
        loc.id AS LocationID,
        loc.name AS LocationName
      ORDER BY 
        cust.id, r.id, car.id
    `;

    const result = await session.run(query);
    const formattedResult = result.records.map(record => record.toObject());
    
    session.close();
    return formattedResult;
  } catch (error) {
    console.error("Error fetching data from Neo4j:", error);
    throw error;
  } finally {
    if (driver) {
      await driver.close();
    }
  }
};

  

module.exports = getCustomersWithCarsAndRentalsNeo4j;