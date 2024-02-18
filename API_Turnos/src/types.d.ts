export type Status = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
  id: string
  canchaId: number
  userId: number
  date: string
  time: string
  status: Status
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type UserWithoutId = Omit<User, 'id'>

export type ReservationWithoutId = Omit<Reservation, 'id'>
