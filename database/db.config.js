const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://postgres:kedMYe^bM694XMGFW9kx@db.lprpwvtrtikvmcaizoeg.supabase.co:5432/postgres"
);
// const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_CONNECTION);

module.exports = sequelize;
