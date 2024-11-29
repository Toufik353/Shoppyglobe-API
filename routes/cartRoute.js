const express = require("express");
const { addToCart, updateCart, removeFromCart } = require("../controllers/cart.controller.js");
const Protect = require("../middelware/authMiddelware.js");

const router = express.Router();

// POST /cart: Add a product to the shopping cart
router.post("/addToCart", Protect, addToCart);

// PUT /cart: Update the quantity of a product in the cart
router.put("/updateCart", Protect, updateCart);

// DELETE /cart: Remove a product from the cart
router.delete("/Delete", Protect, removeFromCart);

module.exports = router;
