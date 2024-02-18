import { sequelize } from './conection'
import User from './user'

User

export const sync = async (): Promise<void> => {
  await sequelize.sync()
}

export const close = async (): Promise<void> => {
  await sequelize.close()
}
