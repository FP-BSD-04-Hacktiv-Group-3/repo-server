const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class WishlistController{
    static async findAll(request, response, next){
        try {
            const data = await prisma.wishlist.findMany({
                include: {
                    product: true
                }
            })

            response.status(200).json({
                statusCode: 200,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async findByUserId(request, response, next){
        try {
            const { id: userId } = request.params;

            const data = await prisma.wishlist.findMany({
                include: {
                    product: true
                },
                where: {
                    userId
                }
            })

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
                userId,
                productId
            } = request.body;

            const data = await prisma.wishlist.create({
                data: {
                    userId,
                    productId
                }
            })

            response.status(201).json({
                statusCode: 201,
                data: "Successfully create wishlist"
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async update(request, response, next){
        try {
            const { id } = request.params;

            const {
                userId,
                productId
            } = request.body;

            const data = await prisma.wishlist.update({
                where: {
                    id
                },
                data: {
                    userId,
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

    static async delete(request, response, next){
        try {
            const { id } = request.params;

            await prisma.wishlist.delete({
                where: {
                    id
                }
            })

            response.status(200).json({
                statusCode: 200,
                data: "Successfully delete " + id
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = WishlistController;