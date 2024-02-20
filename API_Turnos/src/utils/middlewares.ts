import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

type Newerror = Error | ZodError
const errorHandler = (error: Newerror, _request: Request, response: Response, next: NextFunction): void => {
  console.log(error)
  if(error instanceof ZodError) {
    response.status(400).send(error.issues[0].message)
    return
  } else if(error instanceof Error) {
    console.log('error del tipo Error')
    response.status(400).send(error.message)
    return
  }
  console.log('error no controlado')
  next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
  console.log('unknown endpoint')
  return response.status(404).send({ error: 'unknown endpoint' })
}

export default { errorHandler, unknownEndpoint }
