import { configureStore } from '@reduxjs/toolkit'
import home from './reducers/home'
import auth from './reducers/auth'

export const store = configureStore({
  reducer: {
    auth: auth,
    home: home
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch