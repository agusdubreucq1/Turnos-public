import axios from 'axios'
import { ResponseByCreateReservation, ResponseReservations } from '../vite-env'
import { API_URL } from '../const/api'

export const getReservations = async (date: string) => {
  console.log('haciendo peticion: ', date)
  const data = await axios.get(`${API_URL}/reservations/timesFreeByDate/${date}`)
  return data.data as ResponseReservations
}

interface Reservation {
    date: string
    time: string
    duration: number
    canchaId: number
    token: string
}

export const createReservation = async ({date, time, duration, canchaId, token}: Reservation) => {
    const data = await axios.post(`${API_URL}/reservations`, {
        date,
        time,
        duration,
        canchaId
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data.data as ResponseByCreateReservation
}

export const getReservationsByUser = async (token: string) => {
    const data = await axios.get(`${API_URL}/reservations/user`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data.data as ResponseByCreateReservation[]
}
