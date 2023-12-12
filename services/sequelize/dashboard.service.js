const { sequelize } = require("../../models/sequelize/index"); // Import your Sequelize instance

const GetCustomersWithCarsAndRentals = async () => {
  try {
    // Execute the stored procedure using Sequelize with the correct MySQL syntax
    const [results, metadata] = await sequelize.query(
      "CALL GetCustomersWithCarsAndRentals()"
    );

    console.log("Stored procedure executed successfully.");
    console.log("Results:", results); // Contains the result of the stored procedure
    console.log("Metadata:", metadata); // Contains metadata about the result

    // Process the results as needed
    // The 'results' variable will contain the data returned by the stored procedure
    return results;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
  }
};

module.exports = GetCustomersWithCarsAndRentals;
