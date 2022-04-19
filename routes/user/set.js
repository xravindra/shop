const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      email,
      mobile,
      address,
      password,
    } = req.body

    let user = await User.findOne({ email })
    
    if (user) {
      throw ({
        error: true,
        exists: true,
      })
    }
    
    const encryptedPassword = await bcrypt.hash(password, 12)
    user = new User({
      first_name,
      last_name,
      gender,
      email,
      mobile,
      address,
      password: encryptedPassword,
    })

    const response = await user.save()
    return res.send(response)
  } catch (error) { return res.send(error) }
})

module.exports = router