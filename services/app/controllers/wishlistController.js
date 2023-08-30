const { Wishlist, Product, Image } = require("../models");

class WishListController {
  // ID USER DAPET DARI PARAMS
  static async fetchAll(request, response, next) {
    try {
      const { UserId } = request.params;

      const data = await Wishlist.findAll({
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
          include: {
            model: Image,
          },
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // SEMUA DIKIRIMKAN MELALUI REQ.BODY
  // HANDLE KALO ADA DUPLICATE PRODUCTNYA (NANTI), ATAU KALO PRODUCTNYA GAADA
  static async createWishlist(request, response, next) {
    try {
      const { UserId, ProductId } = request.body;

      await Wishlist.create({
        UserId,
        ProductId,
      });

      response.status(201).json({
        message: "New item added to wishlist",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishList(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Wishlist.findByPk(id);

      if (!data) {
        throw { name: "notFound" };
      }

      await Wishlist.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: "Wishlist deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { WishListController };
