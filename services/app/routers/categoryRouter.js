const CategoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/", CategoryController.findMany)
    .get("/:id", CategoryController.findDetail)
    .post("/", CategoryController.create)
    .put("/:id", CategoryController.update)
    .delete("/:id", CategoryController.delete)

module.exports = router;