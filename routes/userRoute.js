const express = require("express")

const { registerUser, loginUser } = require("../controllers/user.controller.js")

const Protect = require("../middelware/authMiddelware.js")

const router = express.Router()

router.post("/register", registerUser)

router.post("/login",
    // Protect,
    loginUser)

module.exports = router