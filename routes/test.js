const router = require(".");

router.get('/test', (req, res) => {
  try {
    res.send({ success: '' })
  } catch (error) {
    res.render('500')
  }
})

module.exports = router