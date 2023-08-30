const {
  Product,
  Image,
  Keyword,
  Category,
  Store,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class ProductController {
  static async fetchAll(request, response, next) {
    try {
      const { category, productName } = request.query;

      const option = {};

      if (category) {
        option.CategoryId = category;
      }

      if (productName) {
        option.name = {
          [Op.iLike]: `%${productName}%`,
        };
      }

      const data = await Product.findAll({
        where: option,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchProductDetail(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Product.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Image,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Keyword,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Store,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!data) {
      }

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // ini image blm di handle
  static async createProduct(request, response, next) {
    const trx = await sequelize.transaction();

    try {
      let { name, description, price, StoreId, CategoryId, images } =
        request.body;

      const stockStatus = "Available";

      await Product.create(
        {
          name,
          description,
          price,
          stockStatus,
          StoreId,
          CategoryId,
        },
        { transaction: trx }
      );

      await trx.commit();

      response.status(201).json({
        message: "New Product Created",
      });
    } catch (error) {
      await trx.rollback();
      console.log(error, 35);
      next(error);
    }
  }

  static async fetchProductStore(request, response, next) {
    try {
      const { id: StoreId } = request.params;

      const data = await Product.findAll({
        where: {
          StoreId,
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(request, response, next) {
    try {
      const { id } = request.params;
      const data = await Product.findByPk(id);

      if (!data) {
      }

      await Product.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(request, response, next) {
    try {
      const { id } = request.params;
      const { name, description, price, stockStatus, StoreId, CategoryId } =
        request.body;

      const data = await Product.findByPk(id);

      if (!data) {
      }

      await Product.update(
        {
          name,
          description,
          price,
          stockStatus,
          StoreId,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: "Product details updated",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProductController };
