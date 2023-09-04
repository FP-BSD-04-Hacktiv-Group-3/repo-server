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
            limit: 1,
            attributes: ["imageUrl"],
            order: [["id", "ASC"]],
          },
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createWishlist(request, response, next) {
    try {
      const { UserId, ProductId } = request.body;

      const product = await Product.findByPk(ProductId);

      if (!product) throw { name: "DataNotFound" };

      const userWishlist = await Wishlist.findAll({
        where: {
          UserId
        }
      })

      const findWishlist = userWishlist.find(el => el.ProductId === +ProductId)

      if(findWishlist) throw { name: "DuplicateWishlistNotAllowed" };

      await Wishlist.create({
        UserId,
        ProductId,
      });

      response.status(201).json({
        message: `${product.name} berhasil ditambahkan ke daftar wishlist`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishList(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Wishlist.findByPk(id, {
        include: {
          model: Product,
          attributes: ['name']
        }
      });

      if (!data) {
        throw { name: "DataNotFound" };
      }

      await Wishlist.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: `${data.Product.name} berhasil dihapus dari wishlist`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { WishListController };
