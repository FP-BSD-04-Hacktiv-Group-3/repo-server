require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const router = require("./routers/router");

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(router);
//   .use(express.static(path.join(__dirname, "public")));

module.exports = app;
