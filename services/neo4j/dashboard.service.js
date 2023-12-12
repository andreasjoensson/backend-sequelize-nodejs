const { initializeNeo4jDriver } = require("../../config/neo4j.config");



const getCustomersWithCarsAndRentalsNeo4j = async () => {
    let driver;
  
    try {
      driver = await initializeNeo4jDriver();
      const session = driver.session();
  
      const query = `
        MATCH (customer:Customer)-[rented:RENTED]->(rental:Rental)-[uses:USES]->(car:Car)
        RETURN customer, rental, car
        ORDER BY customer.CustomerID, rental.RentalID, car.CarID
      `;
  
      const result = await session.run(query);
      const customersWithRentalsAndCars = result.records.map(record => {
        return {
          CustomerID: record.get('customer').properties.CustomerID,
          FirstName: record.get('customer').properties.FirstName,
          LastName: record.get('customer').properties.LastName,
          Email: record.get('customer').properties.Email,
          Phone: record.get('customer').properties.Phone,
          Address: record.get('customer').properties.Address,
          Password: record.get('customer').properties.Password,
          RentalID: record.get('rental').properties.RentalID,
          RentalDate: record.get('rental').properties.RentalDate,
          ReturnDate: record.get('rental').properties.ReturnDate,
          CarID: record.get('car').properties.CarID,
          Make: record.get('car').properties.Make,
          Model: record.get('car').properties.Model,
          Year: record.get('car').properties.Year,
          RentalRate: record.get('car').properties.RentalRate,
        };
      });
  
      session.close();

      console.log('customersWithRentalsAndCars', customersWithRentalsAndCars)
      return customersWithRentalsAndCars;
    } catch (error) {
        console.error(`Error fetching data in Neo4j: ${error}`); 
        console.log('error', error)
      throw new Error(`Error fetching data in Neo4j: ${error.message}`);
    } finally {
      if (driver) {
        await driver.close();
      }
    }
  };
  

module.exports = getCustomersWithCarsAndRentalsNeo4j;