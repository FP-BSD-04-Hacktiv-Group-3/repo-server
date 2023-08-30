const router = require("express").Router();
const categoryRouter = require("../router/categoryRouter");
const apiRouter = require("./apiRouter");
const cartRouter = require("./cartRouter");
const keywordRouter = require("./keywordRouter");

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.use("/categories", categoryRouter);
router.use("/api", apiRouter);
router.use("/carts", cartRouter);
router.use("/keywords", keywordRouter);

module.exports = router;
