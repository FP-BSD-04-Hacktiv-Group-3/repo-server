const router = require("express").Router();
const Controller = require("../controllers/users");

router.post("/login", Controller.loginUser);
router.get("/", Controller.findAllUsers);
router.get("/:id", Controller.findOneUser);
router.post("/", Controller.createUser);
router.delete("/:id", Controller.deleteUser);
router.patch("/:id", Controller.editUser);

module.exports = router;
