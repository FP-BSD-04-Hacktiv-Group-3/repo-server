const { Keyword } = require("../models");

class KeywordController {
  static async create(request, response, next) {
    try {
      const { name, ProductId } = request.body;
      console.log(request.body);
      await Keyword.create({
        name,
        ProductId,
      });
      response.status(201).json({
        statusCode: 201,
        message: "Successfully create",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async delete(request, response, next) {
    try {
      const { id } = request.params;
      await Keyword.destroy({
        where: {
          id,
        },
      });
      response.status(200).json({
        statusCode: 200,
        message: "Successfully deleted",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = KeywordController;
