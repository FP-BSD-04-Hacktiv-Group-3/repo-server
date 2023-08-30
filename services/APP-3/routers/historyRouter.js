const HistoryController = require("../controllers/historyController");
const router = require("express").Router();

router.get("/", HistoryController.create);

module.exports = router;
