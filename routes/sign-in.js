const router = require(".");
const User = require("../models/User");

router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobile })
    if(user){
      res.send({ msg: 'Sign In Successful' })
    } else{
      throw("Not found")
    }
  } catch (error) {
    res.send({ status: '500' })
  }
})

module.exports = router