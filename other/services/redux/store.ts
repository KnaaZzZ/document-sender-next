import { configureStore } from '@reduxjs/toolkit'
import home from './reducers/home'

export const store = configureStore({
  reducer: {
    // auth: ,
    home: home
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch