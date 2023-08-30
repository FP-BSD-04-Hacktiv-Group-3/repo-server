require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
const router = require("./router/index");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
