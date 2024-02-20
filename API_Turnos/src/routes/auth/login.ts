import express from 'express'
import auth from '../../controllers/auth/login'

const router = express.Router()

router.post('/auth/login', auth.login)
router.post('/auth/register',auth.register)

export default router
