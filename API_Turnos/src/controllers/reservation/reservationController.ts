import { Request, Response } from 'express'
import { ReservationModel } from '../../models/utils/reservation'
import { catchedAsync } from '../../utils/catchedAsync'
import middlewares from '../../utils/middlewares'
import { reservationSchema } from '../../schemas/reservation'

const getReservations = async (_req: Request, res: Response) => {
  middlewares.logguerReq(_req, 'get reservations')
  const data = await ReservationModel.getReservations()
  res.send(data)
}

const createReservation = async (req: Request, res: Response) => {
  middlewares.logguerReq(req, 'create reservation')
  await reservationSchema.parseAsync(req.body)
  const data = await ReservationModel.createReservation(req.body)
  res.send(data)
}

const getTimesFreeForDay = async (req: Request, res: Response) => {
  middlewares.logguerReq(req, 'get times free')
  const { date } = req.body
  const data = await ReservationModel.getTimesFreeByDate(date)
  res.send(data)
}

export default {
  getReservations: catchedAsync(getReservations),
  createReservation: catchedAsync(createReservation),
  getTimesFreeForDay: catchedAsync(getTimesFreeForDay),
}
