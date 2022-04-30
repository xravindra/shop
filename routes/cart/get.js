const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart")

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId
    const cart = await Cart.find({ userId })

    if (cart) {
      return res.send(cart)
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router