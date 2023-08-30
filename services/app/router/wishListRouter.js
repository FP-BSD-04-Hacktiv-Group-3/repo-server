const router = require("express").Router();
const { WishListController } = require("../controllers");

router.get("/:UserId", WishListController.fetchAll);
router.post('/', WishListController.createWishlist)
router.delete('/:id', WishListController.deleteWishList)

module.exports = { wishListRouter: router };
