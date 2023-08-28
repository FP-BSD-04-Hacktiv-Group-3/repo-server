const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter")
const errorHandler = require('../middlewares/errorHandlers')

router.get('/', (req,res) => {
  res.send('Hello world!')
})

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use(errorHandler)


module.exports = router