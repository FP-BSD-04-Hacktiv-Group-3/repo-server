const request = require("supertest");
const app = require("../app");
const { Product, Category, Store } = require("../models");

describe("Product Endpoints", function () {
  beforeAll(async () => {
    const productData = require("../db/products.json");
    const storeData = require("../db/stores.json");
    const categoryData = require("../db/categories.json");

    await Category.bulkCreate(categoryData);
    await Store.bulkCreate(storeData);
    await Product.bulkCreate(productData);
  });

  afterAll(async () => {
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Category.destroy({
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

  it("Fetch Products without any filters", async function () {
    const response = await request(app).get("/product");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(expect.any(Number));
  });

  it("Fetch Products with one category filter", async function () {
    const response = await request(app).get("/product?category=1");

    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(expect.any(Object));
    expect(response.body[0].CategoryId).toEqual(1);
  });

  it("Fetch Products with with product name search", async function () {
    const response = await request(app).get(
      "/product?productName=Piring hitam kayu"
    );

    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(expect.any(Object));
    expect(response.body[0].name).toEqual("Piring hitam kayu");
  });

  it("Fetch Products including other table/model", async function () {
    const response = await request(app).get("/product");

    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("Images");
  });

  it("Fetch Product Detail", async function () {
    const response = await request(app).get("/product/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('Fetch Product with detail', async function(){
    const response = await request(app).get('/product/byCat/1')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
    expect(response.body).toHaveProperty('Images', expect.any(Object))
  })

  // buat post product agak bingung karena ada hubungannya ama file/image
  // it("")

  it("Fetch all product from a single store", async function(){
    const response = await request(app).get('/product/byCat/1')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
  })

  it("Post with false endpoint", async function () {
    const response = await request(app).post("/productz");

    expect(response.status).toEqual(404);
  });

  it("Post with error 500", async function () {
    const response = await request(app).post("/product");

    expect(response.status).toEqual(500);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Delete product", async function () {
    const response = await request(app).delete("/product/12");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.message).toEqual("Product deleted successfully");
  });

  it("Edit product", async function () {
    const response = await request(app).put("/product/1").send({
      name: "haha",
      description: "semangat ngoding!!!",
      price: 420,
      stockStatus: "Sold Out",
      CategoryId: 2,
    });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Product details updated");
  });
});
