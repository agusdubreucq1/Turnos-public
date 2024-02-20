import { app } from '../../app'
import supertest from 'supertest'

export const api = supertest(app)
