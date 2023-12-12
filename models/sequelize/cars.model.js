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
      indexes: [
        {
          fields: ['Make', 'Model']
        }
      ]
    }
  );

const MaintenanceRecords = require("./maintenancerecords.model")(sequelize, DataTypes);
const InsurancePolicies = require("./insurancepolicies.model")(sequelize, DataTypes);
const Accessories = require("./accesories.model")(sequelize, DataTypes);
const TrafficViolations = require("./trafficviolations.model")(sequelize, DataTypes);

  Car.hasMany(MaintenanceRecords, { foreignKey: 'CarID' });
  Car.hasMany(InsurancePolicies, { foreignKey: 'CarID' });
  Car.hasMany(Accessories, { foreignKey: 'CarID' });
  Car.hasMany(TrafficViolations, { foreignKey: 'CarID' });


  TrafficViolations.belongsTo(Car, { foreignKey: 'CarID' });
  MaintenanceRecords.belongsTo(Car, { foreignKey: 'CarID' });
  InsurancePolicies.belongsTo(Car, { foreignKey: 'CarID' });
  Accessories.belongsTo(Car, { foreignKey: 'CarID' });


  return Car;
};
