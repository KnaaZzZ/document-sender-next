import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import homeReducer from './reducers/homeReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch