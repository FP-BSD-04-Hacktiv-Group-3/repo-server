const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const apiRouter = require("./apiRouter");

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/api", apiRouter);

module.exports = router;
