const { initializeNeo4jDriver } = require("../../config/neo4j.config");



const getCustomersWithCarsAndRentalsNeo4j = async (customerId) => {
  let driver;

  console.log('getCustomersWithCarsAndRentalsNeo4j', customerId)

  try {
    driver = await initializeNeo4jDriver();
    const session = driver.session();
    
    // Hent kundeoplysninger
    const customerQuery = `
      MATCH (cust:Customer)
      WHERE ID(cust) = $customerId
      RETURN cust
    `;
    const customerResult = await session.run(customerQuery, { customerId: customerId });
    console.log('customerResult', customerResult.records)
    const customer = customerResult.records[0]?.get('cust').properties;

    // Hent udlejninger for kunden
    const rentalsQuery = `
      MATCH (cust:Customer)-[:RENTED_BY]->(r:Rental)
      WHERE ID(cust) = $customerId
      RETURN r
    `;
    const rentalsResult = await session.run(rentalsQuery, { customerId });
    console.log('rentalsResult', rentalsResult.records)
    customer.rentals = rentalsResult.records.map(record => record.get('r').properties);

    // Tilføj biler og lokationer til hver udlejning
    for (const rental of customer.rentals) {
      const rentalId = rental.id; // Erstat med den korrekte måde at hente ID fra rental properties
      
      const carQuery = `
        MATCH (r:Rental)-[:RENTED_CAR]->(car:Car)
        WHERE ID(r) = $rentalId
        RETURN car
      `;
      const carResult = await session.run(carQuery, { rentalId });
      console.log('carResult', carResult.records)
      rental.car = carResult.records[0]?.get('car').properties;

      const locationQuery = `
        MATCH (r:Rental)-[:RENTED_AT]->(loc:Location)
        WHERE ID(r) = $rentalId
        RETURN loc
      `;
      const locationResult = await session.run(locationQuery, { rentalId });
      console.log('locationResult', locationResult.records)
      rental.location = locationResult.records[0]?.get('loc').properties;
    }

    session.close();
    return customer;
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