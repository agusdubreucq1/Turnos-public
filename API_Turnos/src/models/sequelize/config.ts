import { Canchas } from './canchas'
import { sequelize } from './conection'
import { Reservation } from './reservation'
import { SheduleDefault } from './shedulesDefault'
import User from './user'

User
Reservation.belongsTo(Canchas, {
  foreignKey: 'canchaId'
})
Reservation.belongsTo(User, {
  foreignKey: 'userId'
})

export const sync = async (): Promise<void> => {
  await sequelize.sync()
  await Canchas.findOrCreate({
    where: {
      name: 'Cancha 1',
      descripcion: 'Cancha 1',
    }
  })
  await Canchas.findOrCreate({
    where: {
      name: 'Cancha 2',
      descripcion: 'Cancha 2',
    }
  })
  await SheduleDefault.findOrCreate({
    where: {
      horarioInicio: '08:00',
      horarioFin: '18:00',
    },
  })
}

export const close = async (): Promise<void> => {
  await sequelize.close()
}
