import supertest from 'supertest'

import { app, server } from '../../index'
import { close } from '../../models/sequelize/config'
import { UserModel } from '../../models/utils/user'

const api = supertest(app)

beforeAll(async () => {
  await UserModel.deleteAllUsers()
})

describe('auth', () => {
  //   test('login', async () => {
  //     await api
  //       .post('/auth/login')
  //       .send({
  //         email: 'qVnZL@example.com',
  //         name: 'adrian',
  //         password: '1234',
  //       })
  //       .expect(400)
  //   })

  test('register incorrect', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'qVnZL@example.com',
        name: 'adrian',
        password: '1234',
      })
      .expect(400)
    const users = await UserModel.getAllUsers()
    expect(users).toHaveLength(0)
  })

  test('register correct', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'dubreucq02@gmail.com',
        name: 'agustin',
        password: '123456789',
      })
      .expect(200)

    const users = await UserModel.getAllUsers()
    expect(users).toHaveLength(1)
  })
})

afterAll(async () => {
  server.close()
  await close()
})
