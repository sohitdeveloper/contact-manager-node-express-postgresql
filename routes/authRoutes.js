const { Router } = require("express");
const { signUp, login, logout } = require("../controllers/authController");

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
