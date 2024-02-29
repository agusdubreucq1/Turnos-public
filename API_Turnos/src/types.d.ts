import { Model } from 'sequelize'
import { Status } from './enums'

//reservation

export interface Reservation {
  id: number
  canchaId: number
  date: string
  time: string
  duration: number
  status: Status
}

export interface ReservationWithUserId extends Reservation {
  userId: number
}

export type ReservationWithoutId = Omit<Reservation, 'id'>

export type ReservationModel = Model & Reservation

//user
export interface User {
  id: number
  name: string
  email: string
  password: string
  isAdmin?: boolean
}

export type UserFromToken = Omit<User, 'password'>

export type UserWithoutId = Omit<User, 'id'>

export type ReservationWithoutId = Omit<Reservation, 'id'>

export type UserModel = Model & User

//shedules
export interface SheduleDefaultModel extends Model {
  id: number
  horarioInicio: string
  horarioFin: string
}

//formato de tiempo libre
export interface FreeTime {
  [canchaId: number]: string[]
}

export interface ResponseReservations {
  timeFree: FreeTime
  openingTime:string[]
}

export type ReservationFilteredByCancha = Record<number, Reservation[]>
