const express = require("express");
const router = express.Router();
const KeywordController = require("../controllers/keywordController");

router.post("/addKeyword", KeywordController.create);
router.delete("/:id", KeywordController.delete);

module.exports = router;
