const { sequelize } = require("../models/sequelize"); // Import your Sequelize instance

const createStoredProcedure = async () => {
  try {
    // Define your stored procedure SQL query
    const createSPQuery = `
    CREATE PROCEDURE GetCustomersWithCarsAndRentals()
    BEGIN
        SELECT 
            c.CustomerID,
            c.FirstName,
            c.LastName,
            c.Email,
            c.Phone,
            c.Address,
            c.Password,
            r.RentalID,
            r.RentalDate,
            r.ReturnDate,
            car.CarID,
            car.Make,
            car.Model,
            car.Year,
            car.RentalRate
        FROM 
            customers c
        LEFT JOIN 
            rentals r ON c.CustomerID = r.CustomerID
        LEFT JOIN 
            cars car ON r.CarID = car.CarID
        ORDER BY 
            c.CustomerID, r.RentalID, car.CarID;
    END`;

    // Execute the raw query to create the stored procedure
    await sequelize.query(createSPQuery);
    console.log("Stored procedure created successfully.");
  } catch (error) {
    console.error("Error creating stored procedure:", error);
  }
};

module.exports = createStoredProcedure;
