const { Category } = require("../models");

class CategoryController {
  static async findMany(request, response, next) {
    try {
      const { search } = request.query;
      const options = {};
      if (search) {
        options.where = {
          name: search,
        };
      }
      const data = await Category.findAll(options);
      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async findDetail(request, response, next) {
    try {
      const { id } = request.params;
      const data = await Category.findByPk(id);
      if (!data) throw { name: "NOT_FOUND" };
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
      const { name } = request.body;
      await Category.create({
        name,
      });
      response.status(201).json({
        statusCode: 201,
        data: "Successfully create",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async update(request, response, next) {
    try {
      const { id } = request.params;
      const { name } = request.body;
      await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );
      response.status(201).json({
        statusCode: 201,
        data: "Successfully update " + id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async delete(request, response, next) {
    try {
      const { id } = request.params;
      await Category.destroy({
        where: {
          id,
        },
      });
      response.status(200).json({
        statusCode: 200,
        data: "Successfully deleted",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CategoryController;
