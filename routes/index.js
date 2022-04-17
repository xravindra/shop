const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  try {
    req.session.isAuth = true
    req.send()
  } catch (error) { return res.send(error) }
})

module.exports = router