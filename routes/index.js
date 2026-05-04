const express = require("express");
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
// const userRoutes = require("./userProfile.routes");

const router = express.Router();

router.use("/auth",authRoutes);
router.use("/profile",profileRoutes);
// router.use("/user",userRoutes);

module.exports = router