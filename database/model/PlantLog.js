const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class PlantLog extends Model {}

PlantLog.init(
  {
    plant_id: {
      type: DataTypes.INTEGER,
    },
    condition_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "PlantLog",
    tableName: "plant_log",
  }
);

module.exports = PlantLog;
