import { Middleware, Tuple, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice"

const middleWarePersistance: Middleware = (store) => (next) => (action) =>{
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: () => new Tuple(middleWarePersistance)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch