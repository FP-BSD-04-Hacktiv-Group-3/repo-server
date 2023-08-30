const { Store, Product } = require("../models");

class StoreController {
  static async fetchStoreDetail(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Store.findByPk(id, {
        include: {
          model: Product,
        },
      });

      if (!data) {
      }

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async fetchStoreByUserId(request, response, next) {
    try {
      const { UserId } = request.params;

      const data = await Store.findOne({
        where: {
          UserId,
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editStore(request, response, next) {
    try {
      const { id } = request.params;

      const { name, location } = request.body;

      const data = await Store.findByPk(id);

      if (!data) {
      }

      await Store.update(
        {
          name,
          location,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: "Store edited",
      });
    } catch (error) {
      next(error);
    }
  }

  // BELUM TERIMPLEMENTASI SECARA PENUH
  static async createStore(request, response, next) {
    try {
      const { name, location, UserId, profileImg } = request.body;

      await Store.create({
        name,
        location,
      });

      response.status(201).json({
        message: "Store created",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { StoreController };
