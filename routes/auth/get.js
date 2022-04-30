const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const { get } = require("lodash")
const generateAccessToken = require('../../helpers/generateAccessToken')
const User = require("../../models/User")
const Token = require("../../models/Token")

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const receivedPassword = password || ''
      const databasePassword = get(user, 'password', '')
      const isMatch = await bcrypt.compare(receivedPassword, databasePassword)

      if (isMatch) {
        const thisUser = { email: user.email }
        const accessToken = generateAccessToken(thisUser)
        const refreshToken = jwt.sign(thisUser, process.env.REFRESH_TOKEN_SECRET)

        const token = new Token({ token: refreshToken })
        await token.save()

        return res.send({ accessToken, refreshToken, userId: user._id })
      }
    }

    throw ({
      error: true,
      exists: false,
    })
  } catch (error) { return res.send(error) }
})

module.exports = router