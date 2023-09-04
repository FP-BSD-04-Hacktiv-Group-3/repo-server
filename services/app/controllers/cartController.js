const { Cart, Product, Image, Store } = require("../models"); // Import your Sequelize model

class CartController {
  static async fetchAllByUserId(request, response, next) {
    try {
      const { UserId } = request.params;

      const data = await Cart.findAll({
        where: {
          UserId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Image,
              attributes: ['imageUrl'],
              limit: 1,
              order: [
                ["id", 'ASC']
              ]
            },
            {
              model: Store,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCartItem(request, response, next) {
    try {
      const { UserId, ProductId } = request.body;
      const quantity = 1;
      const productData = await Product.findByPk(ProductId);

      if (!productData) throw { name: "DataNotFound" };

      // handle kalo misalnya user mau nambahin product lalu di cart udah ada itemnya
      const productSearch = await Cart.findAll({
        where: {
          UserId,
        },
      });

      const filterCart = productSearch.find(
        (el) => el.ProductId === +ProductId
      );

      if (filterCart) throw { name: "DuplicateNotAllowed" };

      await Cart.create({
        UserId,
        quantity,
        ProductId,
      });

      response.status(201).json({
        message: `${productData.name} berhasil ditambahkan ke keranjang`,
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

      const quantity = data.quantity + 1;

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

      if (quantity < 1) throw { name: "CannotUpdate" };

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

      const data = await Cart.findByPk(id, {
        include: {
          model: Product,
        },
      });

      if (!data) throw { name: "DataNotFound" };

      await Cart.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: `${data.Product.name} sudah dihapus dari keranjang kamu`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAll(request, response, next) {
    try {
      const { UserId } = request.params;

      await Cart.destroy({
        where: {
          UserId,
        },
      });

      response.status(200).json({
        message: "Semua barang di keranjang kamu sudah dihapus",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
