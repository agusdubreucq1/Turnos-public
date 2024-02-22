import { app } from '../../app'
import supertest from 'supertest'
import { UserModel } from '../../models/utils/user'
import { ReservationModel } from '../../models/utils/reservation'
import { server } from '../..'
import { close } from '../../models/sequelize/config'
import { UserFromToken } from '../../types'

export const api = supertest(app)

beforeAll(async () => {
  await UserModel.deleteAllUsers()
  await ReservationModel.deleteAllReservations()
  await api.post('/auth/register').send({
    email: 'dubreucqpablo@gmail.com',
    name: 'agustin',
    password: '123456789',
  })
})

afterAll(async () => {
  server.close()
  await close()
})

export const getTokenAndUser = async () => {
  const res = await api.post('/auth/login').send({
    email: 'dubreucqpablo@gmail.com',
    password: '123456789',
  })
  const token = res.body.token as string
  const user = res.body.user as UserFromToken

  console.log({token, user})
  return {token, user}
}
