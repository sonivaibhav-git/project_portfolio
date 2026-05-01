const express = require("express");
const { logout, refresh, login, register } = require("../controller/auth.controller");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/refresh",refresh);
module.exports = router;