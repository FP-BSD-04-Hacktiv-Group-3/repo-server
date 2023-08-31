const request = require("supertest");
const app = require("../app");
const { Product, Category, Wishlist } = require("../models");

describe('Wishlist endpoints', function (){
  beforeAll(async () => {
    const wishlist = require('../db/wishlists.json')
    const product = require('../db/products.json')

    await Product.bulkCreate(product)
    await Wishlist.bulkCreate(wishlist)
  })

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


  })



})