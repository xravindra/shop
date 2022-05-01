const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart");

router.delete("/", async (req, res) => {
  try {
    const { userId, productId } = req.body
    await Cart.deleteOne({ user: userId, product: productId })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router