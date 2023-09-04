const request = require("supertest");
const app = require("../app");
const { Product, Store, Cart, Image, Category } = require("../models");

describe("Carts Endpoints", function () {
  beforeAll(async () => {
    const productData = require("../db/products.json");
    const storeData = require("../db/stores.json");
    const cartData = require("../db/carts.json");
    const imageData = require("../db/images.json");
    const categoryData = require('../db/categories.json')

    await Category.bulkCreate(categoryData)
    await Store.bulkCreate(storeData);
    await Product.bulkCreate(productData);
    await Cart.bulkCreate(cartData);
    await Image.bulkCreate(imageData);
  });

  afterAll(async () => {
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Store.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }); 

  it("Fetch Cart by userid", async function () {
    const response = await request(app).get("/carts/64ed5f7942e9c21d8fe5e699");

    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.data.length).toEqual(3);
  });

  it("Create cart", async function () {
    const response = await request(app).post("/carts/addCart").send({
      UserId: "64ed5f7942e9c21d8fe5e699",
      quantity: "5",
      ProductId: "1",
      totalPrice: "100000",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty(
      "message",
      "Successfully create a Cart"
    );
  });

  it("Delete Cart", async function () {
    const id = 12;
    const response = await request(app).delete("/carts/12");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.message).toEqual("Successfully delete a Cart " + id);
  });
  it("Delete Cart by userid", async function () {
    const userId = 12;
    const response = await request(app).delete("/carts/deleteByUserId/12");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.message).toEqual(
      "Successfully delete Carts by userId: " + userId
    );
  });

  it("Edit cart", async function () {
    const id = 1;
    const response = await request(app).put("/carts/editCart/1").send({
      UserId: "64ed5f7942e9c21d8fe5e694",
      quantity: "3",
      ProductId: "3",
    });
    console.log(response.body, "0000");
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Successfully update a Cart " + id);
  });
});
