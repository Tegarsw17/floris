const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class PlantCondition extends Model {}

PlantCondition.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "PlantCondition",
    tableName: "plant_condition",
  }
);

module.exports = PlantCondition;
