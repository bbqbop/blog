const { Router } = require("express");
const userController = require("../controllers/user");

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
