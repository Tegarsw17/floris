const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_CONNECTION);

module.exports = sequelize;
