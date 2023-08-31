const express = require("express");
const router = express.Router();
const Controller = require("../controllers/apiController");

router.post("/generate-midtrans-token/:orderId", Controller.midtrans);

module.exports = router;
