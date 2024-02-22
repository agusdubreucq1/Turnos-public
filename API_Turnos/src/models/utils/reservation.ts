import { FreeTime, Reservation as ReservationType, ReservationWithoutId } from '../../types'
import { filterReservationByCancha, generateFreeTimeFilteredByCancha } from '../../utils/reservation'
import { generateTimeArrayByDuration, generateTimeArrayFree } from '../../utils/time'
import { Reservation } from '../sequelize/reservation'
import { CanchasModel } from './canchas'
import { SheduleDefaultModel } from './sheduleDefault'

export const ReservationModel = {
  getReservations: async () => {
    const reservations = await Reservation.findAll()
    return reservations
  },

  getTimesFreeByDateAndCancha: async (date: string, canchaId: number) => {
    const reservations: ReservationType[] = await Reservation.findAll({
      where: {
        date: date,
        canchaId: canchaId,
      },
    })
    console.log('RESERVATIONS: ', reservations)
    const times = reservations.map((reservation) => {
      return generateTimeArrayByDuration(reservation.time.slice(0, 5), reservation.duration)
    })
    const [horarioInicio, horarioFin] = await SheduleDefaultModel.getTimes()
    return generateTimeArrayFree(horarioInicio ?? '08:00', horarioFin ?? '21:00', ...times)
    //TODO: agregar horarios dinamicos de start y end
  },

  getTimesFreeByDate: async (date: string): Promise<FreeTime> => {
    const reservations: ReservationType[] = await Reservation.findAll({
      where: {
        date: date,
      },
    })
    const canchas = (await CanchasModel.getAll()).map((cancha) => cancha.id)
    const reservationsByCanchaId = filterReservationByCancha(reservations, canchas)

    const freeTimes = await generateFreeTimeFilteredByCancha(canchas, reservationsByCanchaId)

    return freeTimes
    //TODO: agregar horarios dinamicos de start y end
    //TODO: refactorizar
  },

  getReservationById: async (id: string) => {
    const reservation = await Reservation.findByPk(id)
    return reservation
  },

  createReservation: async (reservation: ReservationWithoutId) => {
    const createdReservation = await Reservation.create(reservation)
    return createdReservation
  },

  deleteAllReservations: async () => {
    const deletedReservations = await Reservation.destroy({ truncate: true })
    return deletedReservations
  },
}
