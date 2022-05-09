const express = require("express")
const router = express.Router()
const Cart = require("../../models/Cart");

router.delete("/", async (req, res) => {
  try {
    const { userId } = req.body
    await Cart.deleteMany({ user: userId })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router