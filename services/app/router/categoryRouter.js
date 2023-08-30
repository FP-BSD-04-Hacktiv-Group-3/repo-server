const express = require("express");
const router = express.Router();
const Category = require("../controllers/categoryController");

router
  .get("/", Category.findMany)
  .get("/:id", Category.findDetail)
  .post("/addCategory", Category.create)
  .put("/:id", Category.update)
  .delete("/:id", Category.delete);

module.exports = router;
