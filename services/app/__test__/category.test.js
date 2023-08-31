const request = require("supertest");
const app = require("../app");
const { Category } = require("../models");

describe("Product Endpoints", function () {
  beforeAll(async () => {
    const categoryData = require("../db/categories.json");

    await Category.bulkCreate(categoryData);
  });

  afterAll(async () => {
    await Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Fetch Categories without any filters", async function () {
    const response = await request(app).get("/categories");

    expect(response.status).toEqual(200);
    expect(response.body.data.length).toEqual(12);
  });

  it("Fetch one category detail with id params", async function () {
    const response = await request(app).get("/categories/1");

    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.data).toHaveProperty("name", "Ceramics");
  });

  it("Create category", async function () {
    const response = await request(app).post("/categories/addCategory").send({
      name: "Testing",
    });

    console.log(response.body, "<<<<<12312");
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "Successfully create");
  });

  it("Delete Category", async function () {
    const response = await request(app).delete("/categories/1");
    console.log(response.body, "09");
    expect(response.status).toEqual(200);
    // expect(response.body).toEqual(expect.any(Object));
    expect(response.body.message).toEqual("Successfully deleted");
  });

  it("Edit Category", async function () {
    const id = 1;
    const response = await request(app).put("/categories/1").send({
      name: "haha",
    });

    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual(`Successfully update ` + id);
  });
});
