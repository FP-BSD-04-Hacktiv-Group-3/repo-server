const { ChatRoom, Store } = require("../models");

class ChatRoomController {
  static async addChatRoom(request, response, next) {
      try {
        const { UserId, StoreId, ChatId } = request.body;

        console.log(UserId, StoreId, ChatId);

        await ChatRoom.create({
          UserId,
          StoreId,
          ChatId,
        });

        response.status(201).json({
          message: "New chat room created",
        });
      } catch (error) {
        console.log(error)
        // next(error);
      }
  }

  static async getChatRoom(request, response, next) {
    try {
      const { UserId, StoreId } = request.query;

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
        include: {
          model: Store,
        },
      });

      response.status(200).json(data);
    } catch (error) {
      console.log(error)
      // next(error);
    }
  }
}

module.exports = { ChatRoomController };
