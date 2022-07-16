"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address, {
        foreignKey: "userId",
      });
      User.hasMany(models.Identity, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      sub: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      bio: DataTypes.TEXT,
      username: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      meta: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
