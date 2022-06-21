import mongoose from 'mongoose'

const InitiateMongoServer = async () => {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(`Database connected to ${connector.connection.host}`.cyan)
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold)
    process.exit(1)
  }
}

export default InitiateMongoServer
