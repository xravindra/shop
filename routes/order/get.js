const express = require("express")
const router = express.Router()
const Order = require("../../models/Order")

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId
    const order = await Order
      .find(userId ? { user: userId } : {})
      .sort({ createdAt: -1 })
      .populate('product', 'title price description')

    if (order) {
      return res.send(order.map(o => ({
        id: o._id,
        date: o.createdAt,
        products: o.product,
        total: o.product.reduce((sum, prod) => sum + prod.price, 0)
      })))
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router