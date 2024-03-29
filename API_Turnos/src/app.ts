import express from 'express'
import { config } from 'dotenv'
import reservationsRouter from './routes/reservations'
import authRouter from './routes/auth/login'
import middlewares from './utils/middlewares'
import { cors, corsOptions } from './utils/cors'
config()

export const app = express()
app.use(express.json())
app.use(cors)
app.options('*', corsOptions)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use(middlewares.logguer)
app.use('/', authRouter)
app.use('/reservations', reservationsRouter)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)
