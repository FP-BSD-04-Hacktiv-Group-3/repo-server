require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
<<<<<<< HEAD
const router = require("./router/index");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
=======
const {router} = require('./router')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
>>>>>>> 81e6ba802430c78e6583de3d72706240ff98cf0c

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
