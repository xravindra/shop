const router = require(".");
const User = require("../models/User");

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.query.mobile })
    res.send(user)
  } catch (error) { res.send(error) }
})

module.exports = router