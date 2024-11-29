const express = require("express")

const router = express.Router()

const {getAllProducts,getProductById} = require("../controllers/products.controller.js")

router.get("/products", getAllProducts)

router.get("/products/:id",getProductById)

module.exports = router
