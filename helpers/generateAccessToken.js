const jwt = require('jsonwebtoken')
module.exports = (user) => {

  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '100000s'
    }
  )

  return accessToken
}