import express from 'express'
import { config } from 'dotenv'
import reservationsRouter from './routes/reservations'
import authRouter from './routes/auth/login'
import { sync } from './models/sequelize/config'
config()

export const app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/', authRouter)
app.use('/reservations', reservationsRouter)


export const server = app.listen(PORT, async () => {
  try {
    await sync()
    console.log(`Server running on port http://localhost:${PORT}`)

  } catch (error) {
    console.log(error)
  }
})


