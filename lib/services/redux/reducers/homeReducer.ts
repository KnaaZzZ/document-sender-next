import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ConnectionType, UserType } from '@/lib/types'

type HomeType = {
    user: UserType | null,
    connections: ConnectionType[]
}

const initialState: HomeType = {
    user: null,
    connections: []
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<HomeType>) => {
        state = action.payload;
    },
    logout: (state) => {
        state = initialState;
    }
  }
})

export const { login, logout } = homeSlice.actions
export const selectHome = (state: RootState) => state.home
export default homeSlice.reducer