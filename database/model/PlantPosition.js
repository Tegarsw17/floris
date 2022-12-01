const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class PlantPosition extends Model {}

PlantPosition.init(
  {
    plant_id: {
      type: DataTypes.INTEGER,
    },
    latitude: {
      type: DataTypes.DECIMAL(8, 6),
    },
    longitude: {
      type: DataTypes.DECIMAL(8, 6),
    },
  },
  {
    sequelize,
    modelName: "PlantPosition",
    tableName: "plant_position",
  }
);

module.exports = PlantPosition;
