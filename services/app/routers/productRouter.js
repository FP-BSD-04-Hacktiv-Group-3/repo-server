const ProductController = require("../controllers/productController");
const router = require("express").Router();
const upload = require("../middlewares/multer");

router
  .get("/", ProductController.findMany)
  .get("/:id", ProductController.findDetail)
  .post("/", ProductController.create)
  .put("/:id", ProductController.update)
  .delete("/:id", ProductController.delete)

  // REMOVE THIS LATER
  .post("/upload", upload.array("images", 5), ProductController.testingUpload);

module.exports = router;
