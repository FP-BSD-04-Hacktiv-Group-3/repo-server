const { Cart } = require("."); // Import your Sequelize model

class CartController {
  static async findMany(request, response, next) {
    try {
      const data = await Cart.findMany();
      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findManyByUserId(request, response, next) {
    try {
      const { id: userId } = request.params;

      const data = await Cart.findMany({
        where: {
          userId,
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

  static async create(request, response, next) {
    try {
      const { userId, quantity, productId, totalPrice } = request.body;

      await Cart.create({
        userId,
        quantity,
        productId,
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

  static async update(request, response, next) {
    try {
      const { id } = request.params;

      const { userId, quantity, productId, totalPrice } = request.body;

      await Cart.update({
        where: {
          id,
        },
        data: {
          userId,
          quantity,
          productId,
          totalPrice,
        },
      });

      response.status(200).json({
        statusCode: 200,
        data: "Successfully update a Cart " + id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteById(request, response, next) {
    try {
      const { id } = request.params;

      await Cart.deleteById(id);

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
      const { userId } = request.params;

      await Cart.deleteMany({
        where: {
          userId,
        },
      });

      response.status(200).json({
        statusCode: 200,
        data: "Successfully delete Carts by userId: " + userId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CartController;
