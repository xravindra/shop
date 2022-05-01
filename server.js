const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
var cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const morgan = require('morgan')

dotenv.config({ path: './config/config.env' })
connectDB()

const app = express()
app.use(cors())

app.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUninitialized: false
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index'))

app.use('/auth/set', require('./routes/auth/set'))  // RELOGIN renew accesstoken using refreshtoken
app.use('/auth/get', require('./routes/auth/get'))  // LOGIN generate accesstoken and refreshtoken
app.use('/auth/del', require('./routes/auth/del'))  // LOGOUT or delete the accesstoken

app.use('/user/set', require('./routes/user/set')) // REGISTER add new user
app.use('/user/get', authenticateToken, require('./routes/user/get')) // PROFILE get all users or user by email-id
app.use('/user/del', authenticateToken, require('./routes/user/del')) // DELETE delete the user

app.use('/product/set', authenticateToken, require('./routes/product/set'))
app.use('/product/get', authenticateToken, require('./routes/product/get'))
app.use('/product/del', authenticateToken, require('./routes/product/del'))

app.use('/cart/set', authenticateToken, require('./routes/cart/set'))
app.use('/cart/get', authenticateToken, require('./routes/cart/get'))
app.use('/cart/del', authenticateToken, require('./routes/cart/del'))

app.use('/posts', authenticateToken, require('./routes/posts')) // testing api

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const PORT = process.env.PORT || 3000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
)