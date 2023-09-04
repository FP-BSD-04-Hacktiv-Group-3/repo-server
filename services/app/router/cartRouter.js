const express = require("express");
const router = express.Router();
const Cart = require("../controllers/cartController");

router.get("/:UserId", Cart.findManyByUserId);
router.post("/addCart", Cart.addCart);
router.patch('/increment/:id', Cart.incrementCartQuantity)
router.patch('/decrement/:id', Cart.decrementCartQuantity)
router.delete("/:id", Cart.deleteCart);
router.delete("/deleteByUserId/:UserId", Cart.deleteUserId);

module.exports = router;
