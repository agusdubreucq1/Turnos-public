import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState, ResponseFromLogin } from '../../vite-env'

const resetState: AuthState = {
    isAuthenticated: false,
    user: {
    },
  }

const initialState: AuthState = (() => {
  const state = localStorage.getItem('__redux__state__')
  if (state && JSON.parse(state)?.auth) {
    return JSON.parse(state).auth
  }
  return resetState
})()


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ResponseFromLogin>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logoutAuth: ()=>{
        return resetState
    }
  },
})

export default authSlice.reducer

export const { setAuth, logoutAuth } = authSlice.actions
