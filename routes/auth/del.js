const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    req.logout();
  } catch (error) { return res.send(error) }
})

module.exports = router