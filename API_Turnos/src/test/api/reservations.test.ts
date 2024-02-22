import { Status } from '../../enums'
import { api } from './helper'

describe('reservations', () => {
  test('get reservations', async () => {
    const res = await api.get('/reservations').expect(200)
    expect(res.body).toHaveLength(0)
  })

  test('create reservation', async () => {
    const res = await api
      .post('/auth/login')
      .send({
        email: 'dubreucqpablo@gmail.com',
        password: '123456789',
      })
      .expect(200)

    expect(res.body.user.id).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe('dubreucqpablo@gmail.com')

    const token = res.body.token
    const user = res.body.user

    const resReservation = await api
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-01-01',
        time: '12:00',
        duration: 30,
        userId: user.id,
        canchaId: 1,
      })
      .expect(200)

    expect(resReservation.body.status).toBe(Status.confirmed)
  })
})
