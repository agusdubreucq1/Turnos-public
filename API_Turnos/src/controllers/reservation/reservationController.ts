import { Request, Response } from 'express'
import { ReservationModel } from '../../models/utils/reservation'
import { catchedAsync } from '../../utils/catchedAsync'
import middlewares from '../../utils/middlewares'
import { reservationSchema } from '../../schemas/reservation'
import { generateTimeArrayByDuration, isRangeFree } from '../../utils/time'
// import { FreeTime } from '../../types'

const getReservations = async (_req: Request, res: Response) => {
  middlewares.logguerReq(_req, 'get reservations')
  const data = await ReservationModel.getReservations()
  res.send(data)
}

const createReservation = async (req: Request, res: Response) => {
  middlewares.logguerReq(req, 'create reservation')
  await reservationSchema.parseAsync(req.body)
  const { date, duration, time, canchaId } = req.body

  const timesFree = await ReservationModel.getTimesFreeByDateAndCancha(date, canchaId)
  const reservationRange = generateTimeArrayByDuration(time, duration)
  if(!isRangeFree(reservationRange, timesFree)) throw new Error('Time is not free')

  const data = await ReservationModel.createReservation({...req.body, userId: res.locals.user.id})
  res.send(data)
  //TODO: verificar por cancha
  //TODO: que sea una transaccion
  //TODO: que el idCancha se refiera a una cancha en la DB
}

const getTimesFreeForDate = async (req: Request, res: Response) => {
  middlewares.logguerReq(req, 'get times free')
  const { date } = req.body
  if (!date) {
    throw new Error('date is required')
  }
  const data = await ReservationModel.getTimesFreeByDate(date)
  res.send(data)
}

export default {
  getReservations: catchedAsync(getReservations),
  createReservation: catchedAsync(createReservation),
  getTimesFreeForDate: catchedAsync(getTimesFreeForDate),
}
