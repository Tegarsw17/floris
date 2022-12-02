const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class UserRole extends Model {}

UserRole.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "user_role",
  }
);

module.exports = UserRole;
