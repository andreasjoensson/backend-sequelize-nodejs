const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define(
    "Location",
    {
      LocationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "locations",
      timestamps: false,
    }
  );

  return Location;
};
