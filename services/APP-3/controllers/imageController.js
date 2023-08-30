const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ImageController{
    static async findAll(request, response, next){
        try {
            const data = await prisma.image.findMany();

            response.status(200).json({
                statusCode: 200,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async findByProductId(request, response, next){
        try {
            const { id: productId } = request.params;

            const data = await prisma.image.findMany({
                where: {
                    productId
                }
            });

            response.status(200).json({
                statusCode: 200,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async create(request, response, next){
        try {
            const {
                imgUrl,
                productId
            } = request.body;

            const data = await prisma.image.create({
                data: {
                    imgUrl,
                    productId
                }
            })

            response.status(201).json({
                statusCode: 201,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async create(request, response, next){
        try {
            const { id } = request.params;

            const {
                imgUrl,
                productId
            } = request.body;

            const data = await prisma.image.create({
                where: {
                    id
                },
                data: {
                    imgUrl,
                    productId
                }
            })

            response.status(200).json({
                statusCode: 201,
                data: "Succesfully update id " + id
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteById(request, response, next){
        try {
            const { id } = request.params;

            await prisma.image.delete({
                where: {
                    id
                }
            })

            response.status(200).json({
                statusCode: 200,
                data: "Succesfully delete id " + id
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteByProductId(request, response, next){
        try {
            const { id: productId } = request.params;

            await prisma.image.deleteMany({
                where: {
                    productId
                }
            })

            response.status(200).json({
                statusCode: 200,
                data: "Succesfully delete all id " + id
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ImageController;