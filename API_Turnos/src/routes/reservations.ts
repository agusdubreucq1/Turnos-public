import express from 'express'
import * as reservationService from '../controllers/reservationsServices'
import data from '../controllers/reservations.json'

const router = express.Router()

router.get('/', (_req, res) => {
  console.log('get reservations', reservationService.getReservations())
  res.send(data)
})

router.post('/', (_req, res) => {
  res.send('create reservation')
})

export default router
