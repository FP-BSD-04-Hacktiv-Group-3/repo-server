const { Product } = require("../controllers");

class ProductController {
  static async fetchAll(request, response, next){
    try {
      
    } catch (error) {
      next(error)
    }
  }

  static async createProduct(request, response, next){
    try {
      const {name, description, price, status, StoreId, CategoryId} = req.body

      console.log(name, description, price, status, StoreId, CategoryId)

  


    } catch (error) {
      next(error)
    }
  }

}

module.exports = { ProductController };
