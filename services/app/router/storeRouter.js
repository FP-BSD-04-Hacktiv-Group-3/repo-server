const router = require("express").Router();
const { StoreController } = require("../controllers");

router.get("/:id", StoreController.fetchStoreDetail);
router.get("/user/:UserId", StoreController.fetchStoreByUserId);
router.put("/:id", StoreController.editStore);
router.post("/", StoreController.createStore);

module.exports = { storeRouter: router };
