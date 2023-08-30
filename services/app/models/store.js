"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Product, { foreignKey: "StoreId" });
      Store.hasMany(models.ChatRoom, { foreignKey: "StoreId" });
    }
  }
  Store.init(
    {
      name: DataTypes.STRING,
      UserId: DataTypes.STRING,
      location: DataTypes.STRING,
      profileImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
