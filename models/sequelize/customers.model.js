const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define(
    "Customer",
    {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      Phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING, // Adjust the size based on your password hashing
        allowNull: false,
      },
    },
    {
      tableName: "customers",
      timestamps: false,
    }
  );

  const Role = require("./role.model.js")(sequelize, DataTypes); // Assuming your Role model file is called 'role.model.js'

  Customer.belongsToMany(Role, {
    through: "CustomerRoles",
    foreignKey: "CustomerID",
  });

  return Customer;
};
