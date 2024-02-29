import axios from 'axios'
import { API_URL } from '../const/api'
import { ResponseFromLogin } from '../vite-env'

interface Login {
  email: string
  password: string
}

const login = async ({ email, password }: Login) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    })
    return res.data as ResponseFromLogin
  } catch (e) {
    console.log(e)
    throw new Error('Error de login')
  }
}

interface Register extends Login{
  name: string
}

const register = async ({name, email, password}: Register)=>{
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      name
    })
    return res.data
  } catch (e) {
    console.log(e)
    throw new Error('Error al registrarse')
  }
}

export default {
    login,
    register
}