const router = require(".");
const User = require("../models/User");

router.post('/sign-up', async (req, res) => {
  try {
    await User.create(req.body)
    res.send({ msg: 'registration successfull' })
  } catch (error) {
    res.send({ status: '500' })
  }
})

module.exports = router