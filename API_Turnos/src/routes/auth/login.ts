import express from 'express'
import { login, register } from '../../controllers/auth/login'

const router = express.Router()

router.post('/login', login)
router.post('/auth/register', register)

export default router
