const router = require("express").Router();
const Controller = require("../controllers/users");

router.post("/login", Controller.loginUser);
router.get("/", Controller.findAllUsers);
router.get("/detail/:UserId", Controller.fetchUserDetail);
router.get("/:id", Controller.findOneUser);
router.get("/:userId", Controller.findOneUserByUserId);
router.post("/", Controller.createUser);
router.delete("/:id", Controller.deleteUser);
router.patch("/:id", Controller.editUser);

module.exports = router;
