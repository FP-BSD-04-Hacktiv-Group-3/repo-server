const { Order, OrderDetail, Store } = require("../models");

class OrderController {
  static async fetchOrderUser(request, response, next) {
    try {
      const { id: BuyerId } = request.params;

      const data = await Order.findAll({
        where: {
          BuyerId,
        },
        include: {
          model: OrderDetail,
        },
      });

      response.status(200).json(data);
    } catch (error) {
      // next(error);
    }
  }

  static async fetchOrderStore(request, response, next) {
    try {
      const { id: StoreId } = request.params;

      const data = await OrderDetail.findAll({
        where: {
          StoreId,
        },
        include: {
          model: Order
        },
      });

      response.status(200).json(data);
    } catch (error) {
      // next(error);
    }
  }

  static async postOrder(request, response, next) {
    try {
      const {} = request.body;
    } catch (error) {
      // next(error);
    }
  }

  
}

module.exports = { OrderController };
