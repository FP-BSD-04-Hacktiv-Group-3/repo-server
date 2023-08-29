const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");
const { encrypt } = require("../helpers/encrypt");

describe("insert", () => {
  let connection;
  let db;
  let profiles;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb+srv://cahyadigunardi:w285VtMSPAsO8EDT@eldora.rck5rp8.mongodb.net/TacottaTesting",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db();
    profiles = db.collection("profiles"); // Inisialisasi koleksi "users" di sini
  });

  afterAll(async () => {
    // const data = await users.findOne({ _id: "some-user-id" });
    // if (data) await users.deleteOne({ _id: "some-user-id" });
    await profiles.deleteMany({});
    await connection.close();
  });

  it("should insert new profile", async () => {
    const mockProfiles = {
      username: "gun",
      address: "mozia",
      phoneNumber: "0812321",
      userId: "123",
    };
    await profiles.insertOne(mockProfiles);

    const updatedUser = await profiles.findOne({ _id: mockProfiles._id });
    expect(updatedUser).toEqual(mockProfiles);
  });

  it("should get all profile", async () => {
    const response = await request(app).get("/profiles"); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Find All Profiles");
    expect(Array.isArray(response.body.profiles)).toBe(true);
  });

  it("should get profile by id", async () => {
    const profileId = await profiles.findOne({ username: "gun" });
    const response = await request(app).get(`/profiles/` + profileId._id); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Find One Profile with id ${profileId._id}`
    );
    expect(Array.isArray(response.body.profiles)).toBe(false);
  });

  it("should get error invalid account - BSONError", async () => {
    // const profileId = await profiles.findOne({ username: "gunnnn" });
    const response = await request(app).get(`/profiles/` + "123123"); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(`Invalid Email / Password`);
    expect(Array.isArray(response.body.profiles)).toBe(false);
  });

  it("should get error invalid account", async () => {
    // const profileId = await profiles.findOne({ username: "gunnnn" });
    const response = await request(app).get(
      `/profiles/` + "64edab40cc6380f1930875b9"
    ); // Ganti dengan path sesuai endpoint Anda
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(`Invalid Email / Password`);
    expect(Array.isArray(response.body.profiles)).toBe(false);
  });

  it("should edit a profile by id", async () => {
    const mockProfiles = {
      username: "gun",
      address: "mozia",
      phoneNumber: "0812321",
      userId: "123",
    };
    const test = await profiles.insertOne(mockProfiles);
    const id = JSON.parse(JSON.stringify(test.insertedId));
    const updatedData = {
      username: "al",
      address: "bsd",
      phoneNumber: "08123",
      userId: "321",
    };

    const response = await request(app)
      .patch(`/profiles/` + id)
      .send(updatedData);

    expect(response.status).toBe(201);
  });

  it("should delete a profile by id", async () => {
    const mockProfiles = {
      username: "gun",
      address: "mozia",
      phoneNumber: "0812321",
      userId: "123",
    };
    await profiles.insertOne(mockProfiles);
    const response = await request(app).delete(`/profiles/` + mockProfiles._id);
    expect(response.status).toBe(200); // Ganti menjadi 200 sesuai ekspektasi penghapusan berhasil
    expect(response.body.message).toBe(
      `Profile with id ${mockProfiles._id} has been deleted`
    );
  });
});
