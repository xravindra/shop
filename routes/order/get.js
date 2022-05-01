const express = require("express")
const router = express.Router()
const Order = require("../../models/Order")

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId
    const order = await Order
      .find(userId ? { user: userId } : {})
      .sort({ createdAt: -1 })
      .populate('product')

    if (order) {
      return res.send(order.map(o => o.product))
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router