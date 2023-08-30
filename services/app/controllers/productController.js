const {
  Product,
  Image,
  Keyword,
  Category,
  Store,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

const { logging } = require("../helper");

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
        include: {
          model: Image
        }
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

  static async createProduct(request, response, next) {
    const trx = await sequelize.transaction();
    try {
      let { name, description, price, StoreId, CategoryId } = request.body;

      const stockStatus = "Available";

      const product = await Product.create(
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

      const injectImages = [];
      for (const el of request.files) {
        const urlReturn = await logging(el);

        const obj = {
          ProductId: product.id,
          imageUrl: urlReturn,
        };

        console.log(obj, 123123123123);

        injectImages.push(obj);
      }

      await Image.bulkCreate(injectImages, {
        transaction: trx,
      });

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

  // TESTING UPLOAD AJA
  static async multiUpload(request, response, next) {
    try {
      let url = "";

      for (const el of request.files) {
        const urlReturn = await logging(el);
        url += urlReturn + "!@#$%";
      }

      response.status(200).json({
        message: "Image uploaded",
        url,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProductController };
