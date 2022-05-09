const express = require("express")
const router = express.Router()
const Order = require("../../models/Order");

router.delete("/", async (req, res) => {
  try {
    const { userId } = req.query
    await Order.deleteMany({ user: userId })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router