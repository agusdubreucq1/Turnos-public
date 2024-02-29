/// <reference types="vite/client" />

export interface User {
    name?: string
    email?: string
    isAdmin?: boolean
}
export interface AuthState {
    isAuthenticated: boolean
    user: User
    token?: string
}

export interface ResponseFromLogin{
    token: string
    user: User
}


export interface FreeTime {
    [canchaId: number]: string[]
  }
  
  export interface ResponseReservations {
    timeFree: FreeTime
    openingTime:string[]
  }

  export interface ResponseByCreateReservation {
    status: "confirmed",
    id: number
    date: string
    time: string
    duration: number
    canchaId: number
    userId: number
    updatedAt: string
    createdAt: string
}