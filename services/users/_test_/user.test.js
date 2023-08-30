const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");
const { encrypt } = require("../helpers/encrypt");

describe("insert", () => {
  let connection;
  let db;
  let users;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb+srv://cahyadigunardi:w285VtMSPAsO8EDT@eldora.rck5rp8.mongodb.net/TacottaTesting",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db();
    users = db.collection("users");
  });

  afterAll(async () => {
    await users.deleteMany({});
    await connection.close();
  });

  it("should insert new users", async () => {
    const mockUser = {
      email: "test@example.com",
      password: encrypt("testpassword"),
      role: "user",
    };
    await users.insertOne(mockUser);
    const updatedUser = await users.findOne({ _id: mockUser._id });
    expect(updatedUser).toEqual(mockUser);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/users"); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Find All Users");
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  it("should get users by id", async () => {
    const userId = await users.findOne({ email: "test@example.com" });

    const response = await request(app).get(`/users/` + userId._id); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Find One User with id ${userId._id}`);
    expect(Array.isArray(response.body.users)).toBe(false);
  });

  it("should edit a user by id", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "testpassword",
      role: "user",
    };
    const test = await users.insertOne(mockUser);
    const id = JSON.parse(JSON.stringify(test.insertedId));
    const updatedData = {
      email: "updated@example.com",
      password: "newpassword",
      role: "admin",
    };

    const response = await request(app)
      .patch(`/users/` + id)
      .send(updatedData);

    expect(response.status).toBe(201);
  });

  it("should delete a user by id", async () => {
    const mockUser = {
      email: "delete@example.com",
      password: "testpassword",
      role: "user",
    };
    await users.insertOne(mockUser);
    const response = await request(app).delete(`/users/` + mockUser._id);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `User with id ${mockUser._id} has been deleted`
    );
  });

  it("should login a user", async () => {
    const mockUser = {
      email: "login@example.com",
      password: encrypt("testpassword"),
      role: "user",
    };

    const test = await users.insertOne(mockUser);
    const id = JSON.parse(JSON.stringify(test.insertedId));
    const loginData = {
      email: "login@example.com",
      password: "testpassword",
    };

    const response = await request(app).post("/users/login").send(loginData);

    const loginUser = await users.findOne({ _id: mockUser._id });
    expect(response.status).toBe(200);
    expect(response?.body.id).toBe(id);
    expect(response?.body.access_token).toBeTruthy();
    expect(response?.body.email).toBe(loginUser.email);
    expect(response?.body.username).toBeUndefined(); // Assuming there's no username field in your response
    expect(response?.body.role).toBe(loginUser.role);
  });

  it("should handle invalid login", async () => {
    const loginData = {
      email: "nonexistent@example.com",
      password: "wrongpassword",
    };

    const response = await request(app).post("/users/login").send(loginData);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Email / Password");
  });
});
