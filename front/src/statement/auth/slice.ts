import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../vite-env";

const initialState: AuthState = (() => {
    const state = localStorage.getItem("auth")
    if(state) {
        return JSON.parse(state)
    }
    const newstate: AuthState = {
        isAuthenticated: false,
        user: {
            name: null,
            email: null,
            isAdmin: null
        },
        token: null
    }
    return newstate
})()

createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
})