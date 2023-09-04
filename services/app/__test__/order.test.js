const request = require("supertest");
const app = require("../app");
const {Order, Store, OrderDetail} = require('../models')

describe("Order Endpoints", function (){
  beforeAll(async () => {
    const order = require('../db/order.json')
    const orderDetail = require('../db/orderDetails.json')
    const storeData = require('../db/stores.json')

    await Store.bulkCreate(storeData)
    await Order.bulkCreate(order)
    await OrderDetail.bulkCreate(orderDetail)
  })

  afterAll(async () => {
    await Store.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await OrderDetail.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Order.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Fetch user's order", async function(){
    const response = await request(app).get('/order/user-order/64ed5f7942e9c21d8fe5e699')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
  })

  it("Fetch store's order", async function(){
    const response = await request(app).get('/order/store-order/1')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.any(Object))
  })


})