const router = require("express").Router();
const {ProductController} = require('../controllers')

router.get('/', ProductController.fetchAll)
router.get('/:id', ProductController.fetchProductDetail)
router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = { productRouter: router };
