const express = require("express")
const router = express.Router()
const Product = require("../../models/Product")

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()

    if (products) {
      return res.send(products)
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router