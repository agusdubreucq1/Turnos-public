import { z } from 'zod'
import { validMail } from '../utils/mail'

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }).refine(async (value) => await validMail(value), { message: 'Invalid email' }),
  password: z.string().min(6),
  name: z.string(),
  isAdmin: z.boolean().optional()
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string()
})
