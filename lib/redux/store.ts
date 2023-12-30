import { configureStore } from '@reduxjs/toolkit'
import homeDataReducer from './reducers/homeDataReducer'
import authDataReducer from './reducers/authDataReducer'

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    authData: authDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch