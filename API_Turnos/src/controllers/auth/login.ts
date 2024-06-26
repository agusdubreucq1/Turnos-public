import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '../../schemas/login'
import { UserFromToken, UserWithoutId } from '../../types'
import { UserModel } from '../../models/utils/user'
import { catchedAsync } from '../../utils/catchedAsync'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from 'dotenv'
config()

const login = async (req: Request, res: Response): Promise<void> => {
  const userData = await loginSchema.parseAsync(req.body)
  const { email, password } = userData
  const user = await UserModel.getUserByEmail(email)
  if (!user) {
    throw new Error('email or password incorrect')
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!isCorrectPassword) {
    throw new Error('email or password incorrect')
  }
  console.log('--------user---------\n',user, '\n--------user---------\n')
  const userFromToken: UserFromToken = { userId: user.userId, email: user.email, name: user.name, isAdmin: user.isAdmin }
  const token = jwt.sign(userFromToken, process.env.JWT_SECRET!)
  res.send({ token, user: { id: user.userId, name: user.name, email: user.email, isAdmin: user.isAdmin } })
}

const register = async (req: Request, res: Response): Promise<void> => {
  const user = await registerSchema.parseAsync(req.body)
  const { email, password, name, isAdmin } = user
  const newUser: UserWithoutId = {
    email,
    password,
    name,
    isAdmin: isAdmin ?? false,
  }
  const existUser = await UserModel.getUserByEmail(email)
  if (existUser) {
    throw new Error('User already exist')
  }
  await UserModel.createUser(newUser)
  res.send({email, name, isAdmin: isAdmin ?? false})
}

export default { login: catchedAsync(login), register: catchedAsync(register) }
