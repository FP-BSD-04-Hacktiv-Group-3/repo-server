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
          include: [
            {
              model: Image,
            },
            {
              model: Store,
            },
          ],
        },
      });

      response.status(200).json(data);
    } catch (error) {
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
        message: "Successfully create a Cart",
      });
    } catch (error) {
      next(error);
    }
  }

  static async incrementCartQuantity(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Cart.findByPk(id, {
        include: {
          model: Product,
        },
      });

      if (!data) throw { name: "DataNotFound" };

      const quantity = data.quantity + 1
      
      await Cart.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: `Cart with id ${id} with product name '${data.Product.name}' has its quantity increased to ${quantity}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async decrementCartQuantity(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Cart.findByPk(id, {
        include: {
          model: Product,
        },
      });

      if (!data) throw { name: "DataNotFound" };

      const quantity = data.quantity - 1;
      
      if(quantity < 1) throw {name: 'CannotUpdate'}

      await Cart.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: `Cart with id ${id} with product name '${data.Product.name}' has its quantity increased to ${quantity}`,
      });
    } catch (error) {
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
        message: "Successfully delete a Cart " + id,
      });
    } catch (error) {
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
        message: "Successfully delete Carts by userId: " + UserId,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
