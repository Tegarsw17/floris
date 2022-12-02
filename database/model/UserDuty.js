const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class UserDuty extends Model {}

UserDuty.init(
  {
    plant_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "UserDuty",
    tableName: "user_duty",
  }
);

module.exports = UserDuty;
