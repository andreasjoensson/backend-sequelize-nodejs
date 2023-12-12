const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Car = require("./cars.model.js")(sequelize, Sequelize);
db.Customer = require("./customers.model.js")(sequelize, Sequelize);
db.Location = require("./locations.model.js")(sequelize, Sequelize);
db.MaintenanceRecord = require("./maintenancerecords.model.js")(sequelize, Sequelize);
db.InsurancePolicy = require("./insurancepolicies.model.js")(sequelize, Sequelize);
db.Accessory = require("./accesories.model.js")(sequelize, Sequelize);
db.TrafficViolation = require("./trafficviolations.model.js")(sequelize, Sequelize);
db.Rental = require("./rentals.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);

module.exports = db;
