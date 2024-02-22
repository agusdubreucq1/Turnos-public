// index.ts
import { app } from './app'
import { sync } from './models/sequelize/config'

const PORT = 3000

export const server = app.listen(PORT, async () => {
  try {
    await sync()
    console.log(`Server running on port http://localhost:${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
