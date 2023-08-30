"use strict";
const { Model } = require("sequelize");
const wishlist = require("./wishlist");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Image.init(
    {
      imageUrl: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
