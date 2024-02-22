import { z } from 'zod'
import { validMail } from '../utils/mail'

export const registerSchema = z.object({
  email: z.string({ invalid_type_error: 'Invalid email', required_error: 'Email is required' }).email({ message: 'Invalid email' }).refine(async (value) => await validMail(value), { message: 'Invalid email' }),
  password: z.string({required_error: 'Password is required'}).min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string({ required_error: 'Name is required' }),
  isAdmin: z.boolean({ invalid_type_error: 'isAdmin must be a boolean'}).optional()
})

export const loginSchema = z.object({
  email: z.string({ invalid_type_error: 'Invalid email' , required_error: 'Email is required'}).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' })
})
