import { Model } from 'sequelize'
import { Status } from './enums'

//reservation

export interface Reservation {
  id: number
  canchaId: number
  userId: number
  date: string
  time: string
  duration: number
  status: Status
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
