const router = require("express").Router();
const { ProductController } = require("../controllers");
const { upload } = require("../middleware");

router.get("/", ProductController.fetchAll);
router.get("/store/:id", ProductController.fetchProductStore);
router.get("/:id", ProductController.fetchProductDetail);
router.get("/byCat/:CatId", ProductController.fetchProductByCategory);
router.post("/", upload.array("images", 5), ProductController.createProduct);
router.delete("/:id", ProductController.deleteProduct);
router.put('/:id', ProductController.editProduct)

module.exports = { productRouter: router };
