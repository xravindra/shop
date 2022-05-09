const express = require("express")
const router = express.Router()
const Product = require("../../models/Product");

// logout the user
router.delete("/", async (req, res) => {
  try {
    const { productId } = req.query
    await Product.deleteOne({ _id: productId })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router