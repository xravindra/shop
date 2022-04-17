const express = require('express')
const router = express.Router()
const User = require("../../models/User");

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) { res.send(error) }
})

module.exports = router