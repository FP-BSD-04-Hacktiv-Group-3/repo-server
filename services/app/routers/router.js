const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter")

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

module.exports = router