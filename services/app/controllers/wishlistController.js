const { Wishlist, Product } = require("../models");

class WishListController {
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
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { WishListController };
