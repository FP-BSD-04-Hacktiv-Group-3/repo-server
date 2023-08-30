const router = require("express").Router();
const {WishListController} = require('../controllers')

router.get('/:UserId', WishListController.fetchAll)


module.exports = {wishListRouter: router}