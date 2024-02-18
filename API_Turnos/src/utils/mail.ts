import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()

export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'dubreucq2002@gmail.com',
    pass: process.env.PASSWORD_NODEMAILER
  }
})

export const validMail = async (mail: string): Promise<boolean> => {
  const response = await fetch(
    `https://validemail.io/v1/validate?api_key=${process.env.VALIDATOR_KEY ?? ''}&email=${mail}`
  )
  const data = await response.json()
  return data.is_valid === 'Valid'
}
