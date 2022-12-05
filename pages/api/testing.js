// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sequelize = require("../../database/db.config");

export default async function handler(req, res) {
  // try {
  //   await sequelize.authenticate();
  //   console.log("Connection has been established successfully.");
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  // }
  res.status(200).json({ name: "Hello Tegar" });
}
