import { DataTypes } from 'sequelize'
import { ReservationModel } from '../../types'
import { sequelize } from './conection'
import { Status } from '../../enums'

export const Reservation = sequelize.define<ReservationModel>('reservations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  canchaId: {
    type: DataTypes.INTEGER,
  },
  // userId: {
  //   type: DataTypes.UUID,
  // },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.TIME,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(Status)),
    defaultValue: 'confirmed'
  }
})
