"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Store, { foreignKey: "StoreId" });
      Product.belongsTo(models.Category, { foreignKey: "Categoryd" });
      Product.hasMany(models.Keyword, { foreignKey: "ProductId" });
      Product.hasMany(models.Image, { foreignKey: "ProductId" });
      Product.hasMany(models.Cart, { foreignKey: "ProductId" });
      Product.hasMany(models.Wishlist, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
      StoreId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
