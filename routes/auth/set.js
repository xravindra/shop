const express = require("express")
const jwt = require('jsonwebtoken')
const generateAccessToken = require('../../helpers/generateAccessToken')
const router = express.Router()
const Token = require("../../models/Token");

router.post("/", async (req, res) => {
  try {
    const token = req.body.token
    if (token === null) res.sendStatus(401)

    const foundToken = await Token.findOne({ token })
    if (!foundToken) res.sendStatus(403)

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) res.sendStatus(403)
        const thisUser = { email: user.email }
        const accessToken = generateAccessToken(thisUser)
        return res.send({ accessToken })
      }
    )
  } catch (error) { return res.send(error) }
})

module.exports = router