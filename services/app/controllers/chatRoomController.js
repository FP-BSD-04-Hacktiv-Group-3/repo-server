const { ChatRoom, Store } = require("../models");

class ChatRoomController {
  static async addChatRoom(request, response, next) {
    app.post("/chat-store", async (req, res) => {
      try {
        const { UserId, StoreId, ChatId } = req.body;

        console.log(UserId, StoreId, ChatId);

        await UserChat.create({
          UserId,
          StoreId,
          ChatId,
        });

        res.status(201).json({
          message: "New chat room created",
        });
      } catch (error) {
        next(error);
      }
    });
  }

  static async getChatRoom(request, response, next) {
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
        include: {
          model: Store,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ChatRoomController };
