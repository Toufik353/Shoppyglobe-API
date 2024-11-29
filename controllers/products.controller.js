const Product = require("../models/product.model.js")
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
    res.json(products)
    } catch (er) {
        res.status(400).json({message:"Failed to get all the Products"})
   }

}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(product)
    } catch (err) {
        res.status(400).json({message:"unable to fetch the Product of the specific Id"})
    }
}

module.exports = {getAllProducts,getProductById}