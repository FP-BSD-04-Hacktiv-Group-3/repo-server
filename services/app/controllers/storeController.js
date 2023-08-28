const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StoreController{
    static async findAll(request, response, next){
        try {
            const data = await prisma.store.findMany({
                include: {
                    product: true,
                    category: true,
                    image: true
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

    static async findById(request, response, next){
        try {
            const { id } = request.params;
            
            const data = await prisma.store.findFirst({
                where: {
                    id
                },
                include: {
                    product: true,
                    category: true,
                    image: true
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
                name,
                userId,
                description
            } = request.body;

            const data = await prisma.store.create({
                data: {
                    name,
                    userId,
                    description
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

    static async update(request, response, next){
        try {
            const { id } = request.params;

            const {
                name,
                userId,
                description
            } = request.body;

            const data = await prisma.store.update({
                where: {
                    id
                },
                data: {
                    name,
                    userId,
                    description
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

    static async delete(request, response, next){
        try {
            const { id } = request.params;

            await prisma.store.delete({
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

module.exports = StoreController;