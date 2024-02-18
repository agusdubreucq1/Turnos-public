import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '../../schemas/login'
import bcrypt from 'bcrypt'
import { UserWithoutId } from '../../types'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    await loginSchema.parseAsync(req.body)
    res.send('login')
  } catch (error) {
    res.status(400).send(error)
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerSchema.parseAsync(req.body)
    const { email, password, name, isAdmin} = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: UserWithoutId = {
      email,
      password: hashedPassword,
      name,
      isAdmin: isAdmin ?? false
    }
    
    res.send(newUser)
  } catch (error) {
    res.status(400).send(error)
  }
}