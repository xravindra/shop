const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      productId,
    } = req.body

    let cart = await Cart.findOne({ userId, productId })

    if (cart) {
      throw ({
        error: true,
        exists: true,
      })
    }

    cart = new Cart({
      userId,
      productId,
    })

    const response = await cart.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router