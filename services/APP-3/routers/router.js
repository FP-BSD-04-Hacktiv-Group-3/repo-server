const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const apiRouter = require("./apiRouter");
const errorHandler = require("../middlewares/errorHandlers");
const historyRouter = require("./historyRouter");

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/api", apiRouter);
router.use("/histories", historyRouter);
router.use(errorHandler);

module.exports = router;
