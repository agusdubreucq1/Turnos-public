import { api } from './helper'


describe('middlewares', () => {
  test('unknown endpoint', async () => {
    await api.get('/unknown').expect(404)
  })
})

