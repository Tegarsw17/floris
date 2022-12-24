const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class Plant extends Model {}

Plant.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    variety_id: {
      type: DataTypes.INTEGER,
    },
    first_planting: {
      type: DataTypes.DATE,
    },
    is_alive: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Plant",
    tableName: "plant",
  }
);

module.exports = Plant;
