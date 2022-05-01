const express = require("express")
const router = express.Router()
const Order = require("../../models/Order");

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

    let order = await Order.findOne(body)

    if (order) {
      throw ({
        error: true,
        exists: true,
      })
    }

    order = new Order(body)

    const response = await order.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router