const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Rental = sequelize.define(
    "Rental",
    {
      RentalID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RentalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      ReturnDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "rentals",
      timestamps: false,
    }
  );

  // Define associations
  const Car = require("./cars.model.js")(sequelize, DataTypes);
  const Customer = require("./customers.model.js")(sequelize, DataTypes);
  const Location = require("./locations.model.js")(sequelize, DataTypes);

  Rental.belongsTo(Car, { foreignKey: "CarID" });
  Rental.belongsTo(Customer, { foreignKey: "CustomerID" });
  Rental.belongsTo(Location, { foreignKey: "LocationID" });

  return Rental;
};
