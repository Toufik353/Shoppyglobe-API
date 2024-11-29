const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const mongoose = require("mongoose")

// Add a product to the shopping cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("Received productId:", productId);  // Log the productId value

    // Ensure productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId format." });
    }

    // Validate input
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "User ID, Product ID, and Quantity are required." });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Proceed with cart creation or updating
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;  // Update existing quantity
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart successfully.", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update the quantity of a product in the cart
const updateCart = async (req, res) => {
    console.log("req",req.user)
    try {
        const {userId, productId, quantity } = req.body;
        

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const cart = await Cart.findOne({ userId });
        console.log("userid",req.user._id )
      
                console.log("cart",cart)

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        console.log("exist",existingItem)

        existingItem.quantity = quantity; // Update quantity
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log("reqyesu",req.user)

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId); // Remove product
        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    addToCart,
    updateCart,
    removeFromCart,
};
