import express from 'express'
import { config } from 'dotenv'
import reservationsRouter from './routes/reservations'
import authRouter from './routes/auth/login'
import middlewares from './utils/middlewares'
config()

export const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/', authRouter)
app.use('/reservations', reservationsRouter)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)


