const express = require("express")
const router = express.Router()
const User = require("../../models/User")

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query
    const users = await User.find(userId ? { _id: userId } : {})

    if (users) {
      return res.send(users)
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router