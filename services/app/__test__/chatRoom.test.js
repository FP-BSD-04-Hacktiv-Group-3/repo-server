const request = require("supertest");
const app = require("../app");
const { ChatRoom, Store } = require("../models");

describe("Chatroom endpoints", function () {
  beforeAll(async () => {
    const store = require("../db/stores.json");
    const chatRoom = require("../db/chatRoom.json");

    await Store.bulkCreate(store);
    await ChatRoom.bulkCreate(chatRoom);
  });

  afterAll(async () => {
    await ChatRoom.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Store.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Fetch chatroom by admin id", async function () {
    const response = await request(app).get("/chat-room?StoreId=2");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body[0]).toHaveProperty("ChatId", expect.any(String));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(String));
  });

  it("Fetch chatroom by user id", async function () {
    const response = await request(app).get(
      "/chat-room?UserId=64e315dcaa96fe1f5e39436f"
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body[0]).toHaveProperty("ChatId", expect.any(String));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(String));
  });

  it("Fetch chatroom but no room found", async function () {
    const response = await request(app).get("/chat-room?StoreId=200");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.length).toEqual(0);
  });

  it("Post chatroom", async function () {
    const response = await request(app).post("/chat-room").send({
      UserId: "64e315dcaa96fe1f5e39436f",
      StoreId: 1,
      ChatId: "64e315dcaa96fe1f5e39436f1",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "New chat room created");
  });
});
