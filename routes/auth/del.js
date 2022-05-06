const express = require("express")
const router = express.Router()
const Token = require("../../models/Token");

// logout the user
router.delete("/", async (req, res) => {
  try {
    const token = req.headers['authorization']
    await Token.deleteOne({ token })
    return res.sendStatus(204)
  } catch (error) { return res.send(error) }
})

module.exports = router