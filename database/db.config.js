const { Sequelize } = require("sequelize");
import * as pg from "pg";

// const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_CONNECTION);
const sequelize = new Sequelize(
  NEXT_PUBLIC_DATABASE,
  NEXT_PUBLIC_USERNAME,
  NEXT_PUBLIC_PASSWORD,
  {
    host: NEXT_PUBLIC_HOST,
    dialect: NEXT_PUBLIC_DATABASE,
    dialectModule: pg,
  }
);

module.exports = sequelize;
