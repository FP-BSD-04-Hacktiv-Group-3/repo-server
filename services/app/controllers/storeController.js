const { Store, Product } = require("../models");

class StoreController {
  static async fetchStoreDetail(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Store.findByPk(id, {
        include: {
          model: Product,
          attributes: {
            exclude: ["updatedAt"],
          },
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
        attributes: {
          exclude: ["updatedAt"],
        },
      });

      if (!data) throw { name: "StoreNotFound" };

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // belum handle profile imagenya, kayanya buat endpoint baru khusus untuk image
  static async editStore(request, response, next) {
    try {
      const { id } = request.params;

      const { name, location, profileImg } = request.body;

      const data = await Store.findByPk(id);

      if (!data) throw { name: "StoreNotFound" };

      await Store.update(
        {
          name,
          location,
          profileImg,
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
  // static async editImage(request, response, next) {
  //   try {
  //     const { UserId } = request.params;

  //     const { image } = request.body;

  //     const data = await Store.findByPk(UserId);

  //     if (!data) {
  //     }
  //     console.log(UserId, 44);

  //     await Store.update(
  //       {
  //         profileImg: image,
  //       },
  //       {
  //         where: {
  //           UserId: UserId,
  //         },
  //       }
  //     );

  //     response.status(200).json({
  //       message: "Store image edited",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // BELUM TERIMPLEMENTASI SECARA PENUH, soalnya profile image blm ditambah
  static async createStore(request, response, next) {
    try {
      const { name, location, UserId, profileImg } = request.body;

      await Store.create({
        name,
        UserId,
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
