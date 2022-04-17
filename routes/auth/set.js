const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const { name, mobile, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 12)
    let user = await User.findOne({ mobile })

    if (user) {
      throw ({
        error: true,
        exists: true,
      })
    }

    user = new User({
      name,
      mobile,
      password: encryptedPassword,
    })

    const response = await user.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router