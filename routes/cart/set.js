const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      productId,
    } = req.body

    const body = {
      user: userId,
      product: productId,
    }

    let cart = await Cart.findOne(body)

    if (cart) {
      throw ({
        error: true,
        exists: true,
      })
    }

    cart = new Cart(body)

    const response = await cart.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router