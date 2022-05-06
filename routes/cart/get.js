const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart")

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId
    const cart = await Cart
      .find(userId ? { user: userId } : {})
      .populate('product', 'title price description')

    if (cart) {
      return res.send(cart.map(c => c.product))
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router