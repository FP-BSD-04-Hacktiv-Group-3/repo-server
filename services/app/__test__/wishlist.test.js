const request = require("supertest");
const app = require("../app");
const { Product, Category, Wishlist } = require("../models");

describe("Wishlist endpoints", function () {
  beforeAll(async () => {
    const wishlist = require("../db/wishlists.json");
    const product = require("../db/products.json");

    await Product.bulkCreate(product);
    await Wishlist.bulkCreate(wishlist);
  });

  afterAll(async () => {
    await Wishlist.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Fetch all wishlist with user id", async function () {
    const response = await request(app).get(
      "/wishlist/64ed5f7942e9c21d8fe5e699"
    );

    expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty(expect.any(Object))
    expect(response.body.length).toEqual(3);
  });

  it("Fetch wishlist including other model/table", async function () {
    const response = await request(app).get(
      "/wishlist/64ed60c4bc5f511ff91ed977"
    );

    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("Product");
  });

  it("Create wishlist", async function () {
    const response = await request(app).post("/wishlist").send({
      UserId: "64ed60c4bc5f511ff91ed977",
      ProductId: "1",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty(
      "message",
      "New item added to wishlist"
    );
  });

  it("Delete wishlist with id", async function(){
    const response = await request(app).delete('/wishlist/2')

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('message', 'Wishlist deleted')
  })
});
