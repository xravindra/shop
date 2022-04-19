const path = require('path')
const express = require('express')
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
app.use('/user/get', require('./routes/user/get'))
app.use('/user/get', require('./routes/user/get'))
app.use('/user/set', require('./routes/user/set'))

app.use('/auth/get', require('./routes/auth/get'))
app.use('/auth/set', require('./routes/auth/set'))
app.use('/auth/del', require('./routes/auth/del'))

const PORT = process.env.PORT || 3000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
)