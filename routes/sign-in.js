const router = require(".");
const User = require("../models/User");

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne(req.body)
    if (user) {
      res.send({ m: "Sign In Successful" })
    } else {
      throw ({ e: "Customer Not Found" })
    }
  } catch (error) { res.send(error) }
})

module.exports = router