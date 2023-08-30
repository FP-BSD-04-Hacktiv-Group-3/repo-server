const { ChatRoom } = require("../models");

class ChatRoomController {
  static async addChatRoom(request, response, next) {
    try {
      const { UserId, StoreId } = req.query;

      const option = {};

      if (UserId || StoreId) {
        if (UserId) {
          option.UserId = UserId;
        }

        if (StoreId) {
          option.StoreId = StoreId;
        }
      }

      const data = await ChatRoom.findAll({
        where: option,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ChatRoomController };
