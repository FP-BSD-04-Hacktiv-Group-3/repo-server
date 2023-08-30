const router = require("express").Router();
const { OrderController } = require("../controllers");

router.get('/user-order/:id', OrderController.fetchOrderUser)
router.get('/store-order/:id', OrderController.fetchOrderStore)
// router.post('/user-order', )


module.exports = { orderRouter: router };
