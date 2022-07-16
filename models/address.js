"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Address.init(
    {
      userId: DataTypes.INTEGER,
      line1: DataTypes.TEXT,
      line2: DataTypes.TEXT,
      line3: DataTypes.TEXT,
      lat: DataTypes.DOUBLE,
      lng: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
