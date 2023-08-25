const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartController{
    static async findMany(request, response, next){
        try {
            const data = await prisma.cart.findMany();
            
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
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async test(request, response, next){
        try {
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = CartController;