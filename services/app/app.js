const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/router");

app
    .use(cors())
    .use(express.urlencoded({ extended:true }))
    .use(express.json())
    .use(router)


module.exports = app;