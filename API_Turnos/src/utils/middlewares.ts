import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserFromToken } from '../types'
import { adminFirebase } from './firebase.config'
config()

const logguer = (request: Request, _response: Response, next: NextFunction) => {
  logguerReq(request)
  next()
}

const logguerReq = (request: Request, ...args: string[]) => {
  console.log(
    `logguer:\n path: ${request.originalUrl}\n method: ${request.method}\n body: ${JSON.stringify(request.body)}`,
    ...args,
  )
}

type Newerror = Error | ZodError
const errorHandler = (error: Newerror, request: Request, response: Response, next: NextFunction): void => {
  logguerReq(request, 'error:', JSON.stringify(error))
  if (error instanceof ZodError) {
    response.status(400).send(error.issues[0].message)
    return
  } else if (error instanceof Error) {
    // console.log('error del tipo Error')
    response.status(400).send(error.message)
    return
  }
  // console.log('error no controlado')
  next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
  logguerReq(_request, 'unknown endpoint')
  return response.status(404).send({ error: 'unknown endpoint' })
}

const getToken = (request: Request) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return ''
}

const isLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
  logguerReq(request, 'intentando loguearse')
  try {
    // const token = getToken(request)
    console.log(await adminFirebase.auth().listUsers(10))
    // const response = await adminFirebase.auth().verifyIdToken(token)
    // console.log(response)
  } catch (error) {
    console.log('error al intentar loguearse con google', error)
  }
  try {
    const userFromToken = jwt.verify(getToken(request), process.env.JWT_SECRET!) as UserFromToken
    if (userFromToken.id) {
      response.locals.user = userFromToken
      next()
      return
    }
  } catch (error) {
    logguerReq(request, 'error al intentar loguearse normal')
  }
  response.status(401).send({ error: 'invalid token' })
}

export default { errorHandler, unknownEndpoint, isLoggedIn, logguer, logguerReq }
