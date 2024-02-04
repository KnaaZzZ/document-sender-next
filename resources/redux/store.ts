import { configureStore } from '@reduxjs/toolkit'
import { authSlice, homeSlice } from './reducers'

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch