const express = require("express")
const mongoose = require("mongoose")

const connectDB = require("./db.js")

const Product = require("./models/product.model.js")

const productRoute = require("./routes/productRoute.js")

const userRoute = require("./routes/userRoute.js")

const cartRoute = require("./routes/cartRoute.js")


const app = express()

app.use(express.json())


connectDB()




app.use("/", productRoute)

app.use("/", userRoute)

app.use("/",cartRoute)

app.listen(5030, () => {
    console.log("Server is running on PORT 5025")
})