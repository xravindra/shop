const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const Product = require("../../models/Product");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      image,
      price,
      description,
      rating,
      category,
    } = req.body

    let product = await Product.findOne({ title })

    if (product) {
      throw ({
        error: true,
        exists: true,
      })
    }

    product = new Product({
      title,
      image,
      price,
      description,
      rating,
      category,
    })

    const response = await product.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router