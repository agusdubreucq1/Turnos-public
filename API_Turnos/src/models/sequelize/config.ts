import { sequelize } from './conection'
import { Reservation } from './reservation'
import { SheduleDefault } from './shedulesDefault'
import User from './user'

User
Reservation
// SheduleDefault.create({
//   horarioInicio: '08:00',
//   horarioFin: '18:00',
// })


export const sync = async (): Promise<void> => {
  await sequelize.sync()
  await SheduleDefault.create({
    horarioInicio: '08:00',
    horarioFin: '18:00',
  })
}

export const close = async (): Promise<void> => {
  await sequelize.close()
}
