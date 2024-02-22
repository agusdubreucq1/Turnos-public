import { SheduleDefaultModel } from '../models/utils/sheduleDefault'
import { FreeTime, Reservation, ReservationFilteredByCancha } from '../types'
import { generateTimeArrayByDuration, generateTimeArrayFree } from './time'

export const filterReservationByCancha = (reservations: Reservation[], canchas: number[]) => {
  const reservationsByCanchaId: ReservationFilteredByCancha = {}
  for (const cancha of canchas) {
    reservationsByCanchaId[cancha] = []
  }
  for (const reservation of reservations) {
    reservationsByCanchaId[reservation.canchaId].push(reservation)
  }
  return reservationsByCanchaId
}

export const generateFreeTimeFilteredByCancha = async (canchas: number[], reservationsByCanchaId: ReservationFilteredByCancha) => {
  const freeTimes: FreeTime = {}
  for (const cancha of canchas) {
    freeTimes[cancha] = []
  }
  const [horarioInicio, horarioFin] = await SheduleDefaultModel.getTimes()
  for (let i = 0; i < canchas.length; i++) {
    const newReservations = reservationsByCanchaId[canchas[i]]
    const times = newReservations.map((reservation) => {
      return generateTimeArrayByDuration(reservation.time.slice(0, 5), reservation.duration)
    })
    freeTimes[canchas[i]] = generateTimeArrayFree(horarioInicio ?? '08:00', horarioFin ?? '21:00' , ...times) //TODO: agregar horarios de DB
  }
  return freeTimes
}
