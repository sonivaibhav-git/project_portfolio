const express = require("express");
const { logout, refresh, login, register } = require("../controller/auth.contoller");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/refresh",refresh);
module.exports = router;