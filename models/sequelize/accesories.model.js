const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Accessories = sequelize.define(
        "Accessories",
        {
          AccessoryID: {
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
          Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          Description: {
            type: DataTypes.STRING(255),
            allowNull: true,
          }
        },
        {
          tableName: "accessories",
          timestamps: false,
        }
      );
      
      
    return Accessories;
};
