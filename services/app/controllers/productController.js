const { PrismaClient } = require("@prisma/client");
const logging = require("../helpers/upload");
const prisma = new PrismaClient();

class ProductController {
  static async findMany(request, response, next) {
    try {
      const { search, categories } = request.query;
      const data = await prisma.product.findMany();

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

      const data = await prisma.product.findFirst({
        where: {
          id,
        },
      });

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
      const { title, price, stock, description, userId, categoryId } =
        request.body;

      await prisma.product.create({
        data: {
          title,
          price,
          stock,
          description,
          userId,
          categoryId,
        },
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

      const { title, price, stock, description, userId, categoryId } =
        request.body;

      await prisma.product.update({
        where: {
          id,
        },
        data: {
          title,
          price,
          stock,
          description,
          userId,
          categoryId,
        },
      });

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

      const data = await prisma.product.delete({
        where: {
          id,
        },
      });

      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DELETE THIS ENDPOINT LATER THIS IS JUST FOR TESTING
  static async testingUpload(request, response, next) {
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

module.exports = ProductController;
