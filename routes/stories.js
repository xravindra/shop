const router = require(".");
const Story = require("../models/Story");


router.get('/stories', (req, res) => {
  try {
    // req.body()
    // await Story.create({
    //   title: 'aaa',
    //   body: 'aaab',
    // })
    res.send({success:''})
  } catch (error) {
    res.render('500')
  }
})

module.exports = Story