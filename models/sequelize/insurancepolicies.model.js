const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const InsurancePolicies = sequelize.define(
        "InsurancePolicies",
        {
          PolicyID: {
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
          Provider: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          PolicyNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          ExpirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          }
        },
        {
          tableName: "insurancePolicies",
          timestamps: false,
        }
      );
      
    return InsurancePolicies;
};
