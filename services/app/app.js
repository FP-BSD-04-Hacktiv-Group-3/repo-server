require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
const { router } = require("./router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app