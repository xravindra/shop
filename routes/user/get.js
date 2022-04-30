const express = require("express")
const router = express.Router()
const User = require("../../models/User")

router.get("/", async (req, res) => {
  try {
    const { email } = req.query
    const users = await User.find(email ? { email } : {})

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