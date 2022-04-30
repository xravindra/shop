const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  try {
    return res.send({ yaaay: 11 })
  } catch (error) { return res.send(error) }
})

module.exports = router