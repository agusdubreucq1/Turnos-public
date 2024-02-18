import { Reservation } from '../types'
import reservationsData from './reservations.json'

const reservations: Reservation[] = reservationsData as Reservation[]

export function getReservations (): Reservation[] {
  return reservations
}
