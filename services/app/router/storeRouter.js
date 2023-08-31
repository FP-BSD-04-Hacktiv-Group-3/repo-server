const router = require("express").Router();
const { StoreController } = require("../controllers");

router.post("/", StoreController.createStore);
router.get("/:id", StoreController.fetchStoreDetail);
router.get("/user/:UserId", StoreController.fetchStoreByUserId);
router.put("/:id", StoreController.editStore);
// router.put("/image/:UserId", StoreController.editImage);

module.exports = { storeRouter: router };
