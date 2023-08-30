"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetails.belongsTo(models.Order, { foreignKey: "OrderId" });
      OrderDetails.belongsTo(models.Store, { foreignKey: "StoreId" });
    }
  }
  OrderDetail.init(
    {
      OrderId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      productPrice: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      StoreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
