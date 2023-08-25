const router = require("express").Router();
const userRoute = require("./users");
const profileRoute = require("./profile");

router.get("/", (_, res) => res.send("Connected ::)) !!"));
router.use("/users", userRoute);
router.use("/profiles", profileRoute);

module.exports = router;
