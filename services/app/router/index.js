const router = require("express").Router();
const { errorHandler } = require("../middleware/errorHandler");
const { productRouter } = require("./productRouter");
const { storeRouter } = require("./storeRouter");
const { chatRoomRouter } = require("./chatRoomRouter");
const { wishListRouter } = require("./wishListRouter");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/product", productRouter);
router.use("/store", storeRouter);
router.use("/chat-room", chatRoomRouter);
router.use("/wishlist", wishListRouter);

router.use(errorHandler);

module.exports = { router };
