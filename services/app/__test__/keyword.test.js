const request = require("supertest");
const app = require("../app");
const { Keyword, Product, Category, Store } = require("../models");

describe("Product Endpoints", function () {
  beforeAll(async () => {
    const product = require("../db/products.json");
    const keywordData = require("../db/keywords.json");
    const storeData = require("../db/stores.json");
    const categoryData = require("../db/categories.json");

    await Category.bulkCreate(categoryData);
    await Store.bulkCreate(storeData);
    await Product.bulkCreate(product);
    await Keyword.bulkCreate(keywordData);
  });

  afterAll(async () => {
    await Keyword.destroy({
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

  it("Create keyword", async function () {
    const response = await request(app).post("/keywords/addKeyword").send({
      name: "Testing",
      ProductId: "1",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "Successfully create");
  });

  it("Delete Keyword", async function () {
    const response = await request(app).delete("/keywords/1");
    console.log(response.body, "09");
    expect(response.status).toEqual(200);
    // expect(response.body).toEqual(expect.any(Object));
    expect(response.body.message).toEqual("Successfully deleted");
  });
});
