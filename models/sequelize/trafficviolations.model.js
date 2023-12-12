const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TrafficViolations = sequelize.define(
        "TrafficViolations",
        {
          ViolationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          CarID: {
            type: DataTypes.INTEGER,
            references: {
              model: 'cars',
              key: 'CarID',
            }
          },
          DateOfViolation: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          Description: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          FineAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
          },
          Paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          }
        },
        {
          tableName: "trafficViolations",
          timestamps: false,
        }
      );
      
    return TrafficViolations;
};
