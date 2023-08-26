require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers");
const errorHandlers = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandlers);

module.exports = app;
