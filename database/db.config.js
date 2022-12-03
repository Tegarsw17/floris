const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_CONNECTION);

module.exports = sequelize;
