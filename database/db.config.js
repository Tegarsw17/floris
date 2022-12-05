const { Sequelize } = require("sequelize");
import * as pg from "pg";

// const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_CONNECTION);
const sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_DATABASE,
  process.env.NEXT_PUBLIC_USERNAME,
  process.env.NEXT_PUBLIC_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_HOST,
    dialect: process.env.NEXT_PUBLIC_DATABASE,
    dialectModule: pg,
  }
);

module.exports = sequelize;
