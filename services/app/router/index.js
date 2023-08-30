const router = require("express").Router();

const categoryRouter = require("../router/categoryRouter");
const apiRouter = require("./apiRouter");
const cartRouter = require("./cartRouter");
const keywordRouter = require("./keywordRouter");
const { errorHandler } = require("../middleware/errorHandler");
const { productRouter } = require("./productRouter");
const { storeRouter } = require("./storeRouter");
const { chatRoomRouter } = require("./chatRoomRouter");
const { wishListRouter } = require("./wishListRouter");
const { orderRouter } = require("./orderRouter");

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.use("/categories", categoryRouter);
router.use("/api", apiRouter);
router.use("/carts", cartRouter);
router.use("/keywords", keywordRouter);
router.use("/product", productRouter);
router.use("/store", storeRouter);
router.use("/chat-room", chatRoomRouter);
router.use("/wishlist", wishListRouter);
router.use('/order', orderRouter)
router.use(errorHandler);

module.exports = { router };
