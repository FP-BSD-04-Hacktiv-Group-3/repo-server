const request = require("supertest");
const app = require("../app");
const { Store, Product } = require("../models");

describe("Store endpoints", function(){
  beforeAll(async () => {
    const store = require('../db/stores.json')
    const product = require('../db/products.json')

    await Store.bulkCreate(store)
    await Product.bulkCreate(product)
  })

  afterAll(async () => {
    await Store.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }); 
  })

  it('Fetch store with id', async function(){
    const response = await request(app).get('/store/1')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
    expect(response.body).toHaveProperty('name', "Hacktiv7 Store")
    expect(response.body).toHaveProperty('UserId', "64ed5f7942e9c21d8fe5e69a")
  })

  it('Fetch store with id including other model/table', async function(){
    const response = await request(app).get('/store/2')

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('Products', expect.any(Object))
  })

  it('Fetch store with UserId', async function(){
    const response = await request(app).get('/store/user/64ed5f7942e9c21d8fe5e699')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
    expect(response.body).toHaveProperty('name', expect.any(String))
    expect(response.body).toHaveProperty('location', expect.any(String))
  })

  // if('Create store', async function(){

  // })

  it('Edit store', async function(){
    const response = await request(app).put('/store/1')

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('message', "Store edited")
  })

})