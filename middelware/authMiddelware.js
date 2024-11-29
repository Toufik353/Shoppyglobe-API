const jwt = require("jsonwebtoken")

const User = require("../models/user.model.js")

const Protect = async (req, res,next) => {
    const authHeader = req.headers.authorization;
    // console.log("req",req)

    // Check if the header exists and is in the correct format
    if (!authHeader || !authHeader.split(" ")[0]) {
        return res.status(401).json({ message: "Access denied. No token provided." });

    }
        const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    jwt.verify(token, "secret-key", async (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token." })
        }
        req.user = await User.findById(decoded.userId)
        console.log("user",req.user)
next()    

    })
}

module.exports = Protect