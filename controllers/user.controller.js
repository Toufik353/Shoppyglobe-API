const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({ message: "User already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Failed to register the user. Please try again later." });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not registered. Please register the user." });
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, "secret-key", { expiresIn: "1h" });

        res.status(200).json({ message: "User logged in successfully.", token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Failed to login. Please try again later." });
    }
};

module.exports = { registerUser, loginUser };
