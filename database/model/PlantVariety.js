const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class PlantVariety extends Model {}

PlantVariety.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "PlantVariety",
    tableName: "plant_variety",
  }
);

module.exports = PlantVariety;
