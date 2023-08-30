// const request = require("supertest");
// const app = require("../app");
// const { Category, Product, User } = require("../models");

// const categories = require("../db/categories.json");
// const products = require("../db/products.json");

// describe("Product", () => {
//   beforeAll(async () => {
//     await Category.bulkCreate(categories);
//     await Product.bulkCreate(products);
//   });

//   afterAll(async () => {
//     await Product.destroy({
//       truncate: true,
//       cascade: true,
//       restartIdentity: true,
//     });
//     await Category.destroy({
//       truncate: true,
//       cascade: true,
//       restartIdentity: true,
//     });
//   });

//   it("200 Success get products without token and without query filter parameter", async function () {
//     console.log("product test");
//     const response = await request(app)
//       .get("/products")
//       .set("Accept", "application/json");

//     const responseBody = response.body;
//     const { length } = responseBody.data;

//     expect(response.status).toEqual(200);
//     expect(length).toBe(20);
//     // expect(responseBody.data[0]).toHaveProperty("name", "Janinge");
//   });

//   // it("200 Success get products without token and with 1 query filter parameter", async function () {
//   //   console.log("product test");
//   //   const response = await request(app)
//   //     .get("/pub/products?name=Kallax")
//   //     .set("Accept", "application/json");

//   //   const responseBody = response.body;
//   //   const { length } = responseBody.data;

//   //   expect(response.status).toEqual(200);
//   //   expect(length).toBe(1);
//   //   expect(responseBody.data[0]).toHaveProperty("name", "Kallax");
//   // });

//   // it("200 Success get products without token and with pagination", async function () {
//   //   console.log("product test");
//   //   const pageSize = 8;

//   //   const response = await request(app)
//   //     .get("/pub/products?page=2")
//   //     .set("Accept", "application/json");

//   //   const responseBody = response.body;
//   //   const { length } = responseBody.data;

//   //   expect(response.status).toEqual(200);
//   //   expect(length).toBe(pageSize);
//   //   expect(responseBody.data[0]).toHaveProperty("name", "Askholmen");
//   // });

//   // it("200 Success get product without token and with 1 valid params id", async function () {
//   //   console.log("product test");
//   //   const response = await request(app)
//   //     .get("/pub/products/1")
//   //     .set("Accept", "application/json");

//   //   const responseBody = response.body;

//   //   expect(response.status).toEqual(200);
//   //   expect(responseBody.data).toHaveProperty("name", "Janinge");
//   // });

//   // it("404 Failed get inventories with invalid params id - should return error message 'Error Product Not Found'", async function () {
//   //   console.log("product test");
//   //   const response = await request(app)
//   //     .get("/pub/products/120")
//   //     .set("Accept", "application/json");

//   //   const responseBody = response.body;

//   //   expect(response.status).toEqual(404);
//   //   expect(responseBody).toHaveProperty("message", "Error Product Not Found");
//   // });
// });
