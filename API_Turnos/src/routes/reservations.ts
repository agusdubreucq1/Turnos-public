import express from 'express'
import middlewares from '../utils/middlewares'
import reservationController from '../controllers/reservation/reservationController'

const router = express.Router()

router.get('/', reservationController.getReservations)

router.post('/', middlewares.isLoggedIn, reservationController.createReservation)

export default router
