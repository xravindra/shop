const express = require("express")
const router = express.Router()
const User = require("../../models/User");

router.delete("/", async (req, res) => {
  try {
    const { userId } = req.query
    await User.deleteOne({ _id: userId })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router