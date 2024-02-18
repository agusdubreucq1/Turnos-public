import express from 'express'
import { config } from 'dotenv'

import reservationsRouter from './routes/reservations'
config()

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/reservations', reservationsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
