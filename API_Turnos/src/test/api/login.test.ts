
import { UserModel } from '../../models/utils/user'
import { server } from '../../index'
import { close } from '../../models/sequelize/config'
import { api } from './helper'

beforeAll(async () => {
  await UserModel.deleteAllUsers()
})

describe('register', () => {
  test('register incorrect password', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'dubreucq02@gmail.com',
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

  test('register incorrect email', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'qVnZL@example.com',
        name: 'adrian',
        password: '123456789',
      })
      .expect(400)
    const users = await UserModel.getAllUsers()
    expect(users).toHaveLength(1)
  })

  test('register repeat email', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'dubreucq02@gmail.com',
        name: 'adrian',
        password: '123456789',
      })
      .expect(400)
    const users = await UserModel.getAllUsers()
    expect(users).toHaveLength(1)
  })

  test('register without name', async () => {
    await api
      .post('/auth/register')
      .send({
        email: 'dubreucq02@gmail.com',
        password: '123456789',
      })
      .expect(400)
    const users = await UserModel.getAllUsers()
    expect(users).toHaveLength(1)
  })
})

describe('login', () => {
  test('login incorrect password', async () => {
    await api.post('/auth/login').send({
      email: 'dubreucq02@gmail.com',
      password: '1234',
    }).expect(400)
  })

  test('login incorrect mail', async () => {
    await api.post('/auth/login').send({
      email: 'cualquiera@gmail.com',
      password: '123456789',
    }).expect(400)
  })

  test('login correct', async () => {
    const res = await api.post('/auth/login').send({
      email: 'dubreucq02@gmail.com',
      password: '123456789',
    }).expect(200)
    expect(res.body.token).toBeDefined()
  })
})

afterAll(async () => {
  server.close()
  await close()
})
