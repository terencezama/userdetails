"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Identity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Identity.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Identity.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.CHAR,
      number: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dob: DataTypes.DATE,
      gender: DataTypes.CHAR,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Identity",
    }
  );
  return Identity;
};
