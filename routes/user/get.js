const express = require('express')
const router = express.Router()
const User = require("../../models/User");

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.query.mobile })
    res.send(user)
  } catch (error) { res.send(error) }
})

module.exports = router