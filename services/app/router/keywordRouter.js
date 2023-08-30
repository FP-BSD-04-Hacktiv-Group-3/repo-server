const express = require("express");
const router = express.Router();
const Keyword = require("../controllers/keywordController");

router.post("/addKeyword", Keyword.create);
router.delete("/:id", Keyword.delete);

module.exports = router;
