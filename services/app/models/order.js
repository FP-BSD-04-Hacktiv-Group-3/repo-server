"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      this.hasMany(models.OrderDetail, { foreignKey: "OrderId" });
=======
      Order.hasMany(models.OrderDetail, { foreignKey: "OrderId" });
>>>>>>> 81e6ba802430c78e6583de3d72706240ff98cf0c
    }
  }
  Order.init(
    {
      status: DataTypes.STRING,
      BuyerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
