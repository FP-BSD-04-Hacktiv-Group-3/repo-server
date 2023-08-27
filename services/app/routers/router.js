const router = require("express").Router();
const productRouter = require("./productRouter");
const errorHandler = require('../middlewares/errorHandlers')

router.get('/', (req,res) => {
  res.send('Hello world!')
})

router.use("/products", productRouter)
router.use(errorHandler)

module.exports = router