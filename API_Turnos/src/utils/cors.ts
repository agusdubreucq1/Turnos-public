import { NextFunction, Request, Response } from 'express'

const ACCEPTED_ORIGINS = ['http://localhost:5173']

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.header('origin') ?? '' //origin que manda la peticion
  //si es del mismo origen la api y el fetch no devuelve el origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
}

export const corsOptions = (req: Request, res: Response) => {
  const origin = req.header('origin') ?? '' //origin que manda la peticion
  //si es del mismo origen la api y el fetch no devuelve el origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, PUT')
    res.header('Access-Control-Allow-Headers', '*')
  }
  res.sendStatus(200)
}
