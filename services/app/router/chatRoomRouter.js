const router = require("express").Router();
const { ChatRoomController } = require("../controllers");

router.get("/", ChatRoomController.getChatRoom);
router.post("/", ChatRoomController.addChatRoom);

module.exports = { chatRoomRouter: router };
