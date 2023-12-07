const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Car = require("../models/cars.model.js")(sequelize, Sequelize);
db.Customer = require("../models/customers.model.js")(sequelize, Sequelize);
db.Location = require("../models/locations.model.js")(sequelize, Sequelize);
db.Rental = require("../models/rentals.model.js")(sequelize, Sequelize);
db.Role = require("../models/role.model.js")(sequelize, Sequelize);

module.exports = db;
