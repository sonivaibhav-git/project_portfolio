const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { Profile,UpdateProfile,DeleteProfile } = require("../controller/profile.controller");
const router  = express.Router();

router.get("/me",authMiddleware,Profile);
router.patch("/me/edit",authMiddleware,UpdateProfile)
router.delete("/me/delete",authMiddleware,DeleteProfile)


module.exports = router