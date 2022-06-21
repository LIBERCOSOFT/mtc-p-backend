import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'

const port = process.env.PORT || 8000
const app = express()

import InitiateMongoServer from './config/db.js'
import driverRoutes from './routes/driverRoutes.js'
import merchantRoutes from './routes/merchantRoutes.js'
import superAdminRoutes from './routes/superAdminRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
colors.enable()

app.use(helmet())
app.use(cors())
app.use(express.json())

InitiateMongoServer()

app.get('/', (req, res) => {
  res.status(200).send('Server Started!!')
})

app.use('/api/driver', driverRoutes)
app.use('/api/merchant', merchantRoutes)
app.use('/api/superadmin', superAdminRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at port : ${port}`.magenta)
})
