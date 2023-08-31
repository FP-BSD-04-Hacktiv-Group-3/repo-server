const { Cart, Product, Image, Store } = require("../models"); // Import your Sequelize model

class CartController {
  static async findManyByUserId(request, response, next) {
    try {
      const { UserId } = request.params;

      const data = await Cart.findAll({
        where: {
          UserId,
        },
        include: {
          model: Product,
          include: [{
            model: Image,
            
          }, {
            model: Store
          }],
        },
      });

      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addCart(request, response, next) {
    try {
      const { UserId, quantity, ProductId, totalPrice } = request.body;

      await Cart.create({
        UserId,
        quantity,
        ProductId,
        totalPrice,
      });

      response.status(201).json({
        statusCode: 201,
        data: "Successfully create a Cart",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editCart(request, response, next) {
    try {
      const { id } = request.params;

      const { UserId, quantity, ProductId } = request.body;

      await Cart.update(
        {
          UserId,
          quantity,
          ProductId,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        statusCode: 200,
        data: "Successfully update a Cart " + id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteCart(request, response, next) {
    try {
      const { id } = request.params;

      await Cart.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        statusCode: 200,
        data: "Successfully delete a Cart " + id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUserId(request, response, next) {
    try {
      const { UserId } = request.params;

      await Cart.destroy({
        where: {
          UserId,
        },
      });

      response.status(200).json({
        statusCode: 200,
        data: "Successfully delete Carts by userId: " + UserId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CartController;
