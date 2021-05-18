
const config = require('../config').test
const Sequelize = require("sequelize");

const {name, username, password, host, database, dialect} = config;

const sequelize = new Sequelize(name, username, password, {
    host,
    dialect,
    database,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./tasks.js")(sequelize, Sequelize);
db.admins = require("./admin.js")(sequelize, Sequelize);



module.exports = db;