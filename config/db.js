const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    console.log('HOST: ', conn.connection.host);

  } catch (error) {
    console.log('error: ', error)
  }
}

module.exports = connectDB