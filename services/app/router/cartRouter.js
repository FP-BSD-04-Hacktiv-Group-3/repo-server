const express = require("express");
const router = express.Router();
const Cart = require("../controllers/cartController");

router.get("/:UserId", Cart.fetchAllByUserId);
router.post("/add", Cart.addCartItem);
router.patch('/increment/:id', Cart.incrementCartQuantity)
router.patch('/decrement/:id', Cart.decrementCartQuantity)
router.delete("/:id", Cart.deleteCart);
router.delete("/delete-all/:UserId", Cart.deleteAll);

module.exports = router;
