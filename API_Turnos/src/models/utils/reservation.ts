import { Reservation as ReservationType, ReservationWithoutId } from '../../types'
import { generateTimeArrayByDuration, generateTimeArrayFree } from '../../utils/time'
import { Reservation } from '../sequelize/reservation'

export const ReservationModel = {
  getReservations: async () => {
    const reservations = await Reservation.findAll()
    return reservations
  },

  getTimesFreeByDate: async (date: string) => {
    const reservations: ReservationType[] = await Reservation.findAll({
      where: {
        date: date
      }
    })
    const times = reservations.map(reservation => {
      return generateTimeArrayByDuration(reservation.time, reservation.duration)
    })
    return generateTimeArrayFree('08:00', '21:00', ...times)
    //TODO: agregar horarios dinamicos de start y end

  },

  getReservationById: async (id: string) => {
    const reservation = await Reservation.findByPk(id)
    return reservation
  },

  createReservation: async (reservation: ReservationWithoutId) => {
    const createdReservation = await Reservation.create(reservation)
    return createdReservation
  },

  deleteAllReservations: async() => {
    const deletedReservations = await Reservation.destroy({truncate: true})
    return deletedReservations
  }
}
