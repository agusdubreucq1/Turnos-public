
import { UserModel } from '../../models/utils/user'
import { api } from './helper'

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
    expect(users).toHaveLength(1)
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
    expect(users).toHaveLength(2)
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
    expect(users).toHaveLength(2)
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
    expect(users).toHaveLength(2)
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
    expect(users).toHaveLength(2)
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

describe('middleware logguedIn', ()=>{
  test('not loggued', async ()=>{
    await api.post('/reservations').send({
      algo: 'algo'
    }).expect(401)
  })

  // test('loggued', async ()=>{
  //   const res = await api.post('/auth/login').send({
  //     email: 'dubreucq02@gmail.com',
  //     password: '123456789',
  //   })
  //   const token = res.body.token

  //   await api.post('/reservations').set('Authorization', `Bearer ${token}`).send({
  //     canchaId
  //   }).expect(200)
  // })

  test('wrong token', async ()=>{
    await api.post('/reservations').set('Authorization', 'Bearer algo').send({
      algo: 'algo'
    }).expect(401)
  })
})
