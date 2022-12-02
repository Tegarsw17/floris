const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "User",
    tableName: "user",
  }
);

module.exports = User;
