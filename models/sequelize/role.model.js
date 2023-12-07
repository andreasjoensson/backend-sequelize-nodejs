const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      RoleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "roles",
      timestamps: false,
    }
  );

  return Role;
};
