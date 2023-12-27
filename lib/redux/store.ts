import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './reducers/userDataReducer'
import authDataReducer from './reducers/authDataReducer'

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    authData: authDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch