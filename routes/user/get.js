const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const { get } = require("lodash")
const User = require("../../models/User")

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const receivedPassword = password || ''
      const databasePassword = get(user, 'password', '')
      const isMatch = await bcrypt.compare(receivedPassword, databasePassword)

      if (isMatch) {
        return res.send(user)
      }
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router