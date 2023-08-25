const ProductController = require("../controllers/productController");
const router = require("express").Router();

router
    .get("/", ProductController.findMany)
    .get("/:id", ProductController.findDetail)
    .post("/", ProductController.create)
    .put("/:id", ProductController.update)
    .delete("/:id", ProductController.delete)

module.exports = router