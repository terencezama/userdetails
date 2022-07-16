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
      // define association here
    }
  }
  Identity.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
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
