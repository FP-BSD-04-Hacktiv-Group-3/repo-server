const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductController{
    static async findMany(request, response, next){
        try {
            const data = await prisma.category.findMany();

            response.status(200).json({
                statusCode: 200,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async findDetail(request, response, next){
        try {
            const { id } = request.params;

            const data = await prisma.category.findFirst({
                where: {
                    id
                }
            })

            if(!data) throw { name: "NOT_FOUND" };

            response.status(200).json({
                statusCode: 200,
                data
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async create(request, response ,next){
        try {
            const { 
                name
             } = request.body;

             await prisma.category.create({
                data: {
                    name
                }
             })

             response.status(201).json({
                statusCode: 201,
                data: "Successfully create"
             })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async update(request, response ,next){
        try {
            const { id } = request.params;

            const { 
                name
             } = request.body;

             await prisma.category.update({
                where:{
                    id
                },
                data: {
                    name
                }
             })

             response.status(201).json({
                statusCode: 201,
                data: "Successfully update " + id
             })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async delete(request, response, next){
        try {
            const { id } = request.params;

            const data = await prisma.category.delete({
                where: { 
                    id
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

}

module.exports = ProductController;