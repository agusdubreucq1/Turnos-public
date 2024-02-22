import { Status } from '../../enums'
import { api, getTokenAndUser } from './helper'

describe('reservations', () => {
  test('get reservations', async () => {
    const res = await api.get('/reservations').expect(200)
    expect(res.body).toHaveLength(0)
  })

  test('create reservation', async () => {
    const { token, user } = await getTokenAndUser()

    console.log('creando la reserva: ', {token, user})

    const resReservation = await api
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-01-01',
        time: '12:00',
        duration: 90,
        canchaId: 1,
      })
      .expect(200)

    expect(resReservation.body.status).toBe(Status.confirmed)
  })

  test('/reservations/timesFreeByDate', async () => {
    const res = await api
      .get('/reservations/timesFreeByDate')
      .send({
        date: '2024-01-01',
      })
      .expect(200)
    console.log(res.body)
    expect(res.body).not.toContain('12:00')
    expect(res.body).toContain('11:30')
  })

  test('/reservations/timesFreeByDate', async () => {
    await api.get('/reservations/timesFreeByDate').expect(400)
  })

  test('create reservation', async () => {
    const { token } = await getTokenAndUser()

    const resReservation = await api
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-01-01',
        time: '09:00',
        duration: 90,
        canchaId: 1,
      })
      .expect(200)

    expect(resReservation.body.status).toBe(Status.confirmed)
  })

  test('create reservation equal', async () => {
    const { token } = await getTokenAndUser()

    await api
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-01-01',
        time: '09:00',
        duration: 60,
        canchaId: 1,
      })
      .expect(400)
  })

  test('create reservation equal, but different cancha', async () => {
    const { token } = await getTokenAndUser()

    await api
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-01-01',
        time: '09:00',
        duration: 60,
        canchaId: 2,
      })
      .expect(400)
  })
})
