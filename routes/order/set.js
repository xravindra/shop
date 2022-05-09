const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body

    const cart = await Cart
      .find(userId ? { user: userId } : {})
      .populate('product', '')

    if (cart) {
      order = new Order({ user: userId, product: cart.map(c => c.product._id) })
      await order.save()
      await Cart.deleteMany({ user: userId })
      return res.sendStatus(204)
    }

    throw ({
      error: true,
      exists: true,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router