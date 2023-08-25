const router = require("express").Router();
const Controller = require("../controllers/profiles");

router.get("/", Controller.findAllProfiles);
router.get("/:id", Controller.findOneProfile);
router.post("/", Controller.createProfile);
router.delete("/:id", Controller.deleteProfile);
router.patch("/:id", Controller.editProfile);

module.exports = router;
