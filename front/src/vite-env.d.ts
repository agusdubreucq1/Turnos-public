/// <reference types="vite/client" />

export interface User {
    name: string | null
    email: string | null
    isAdmin: boolean | null
}
export interface AuthState {
    isAuthenticated: boolean
    user: User
    token: string | null
}