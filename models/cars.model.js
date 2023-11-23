const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define(
    "Car",
    {
      CarID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Make: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Model: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      RentalRate: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
    },
    {
      tableName: "cars",
      timestamps: false,
    }
  );

  return Car;
};
