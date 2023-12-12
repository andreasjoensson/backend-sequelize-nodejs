const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const MaintenanceRecords = sequelize.define(
        "MaintenanceRecords",
        {
          RecordID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          CarID: {
            type: DataTypes.INTEGER,
            references: {
              model: 'cars', // 'cars' refers to table name
              key: 'CarID',   // 'CarID' is the column name in the 'cars' table
            }
          },
          ServiceDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          Description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          Cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
          }
        },
        {
          tableName: "maintenanceRecords",
          timestamps: false,
        }
      );
    return MaintenanceRecords;
};
