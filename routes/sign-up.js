const router = require(".");
const User = require("../models/User");

router.post('/sign-up', async (req, res) => {
  try {
    await User.create(req.body)
    res.send({ m: 'Sign Up Successful' })
  } catch (error) { res.send(error) }
})

module.exports = router