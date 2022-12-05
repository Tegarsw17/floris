const { Sequelize } = require("sequelize");
import * as pg from "pg";

// const sequelize = new Sequelize(
//   "postgresql://postgres:kedMYe^bM694XMGFW9kx@db.lprpwvtrtikvmcaizoeg.supabase.co:5432/postgres"
// );
// const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_CONNECTION);
const sequelize = new Sequelize(
  "postgres",
  "postgres",
  "kedMYe^bM694XMGFW9kx",
  {
    host: "db.lprpwvtrtikvmcaizoeg.supabase.co",
    dialect: "postgres",
    dialectModule: pg,
  }
);

module.exports = sequelize;
