import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserType, ConnectionType } from '../../types/index'

type HomeDataType = {
  user: UserType | null,
  connections: ConnectionType[]
}

const initialState : HomeDataType = {
  user: null,
  connections: []
}

export const homeDataSlice = createSlice({
  name: 'homeData',
  initialState,
  reducers: {
    login : (state, action: PayloadAction<HomeDataType>) => {
      state = action.payload;
    },
    logout : state => {
        state = initialState;
    }
  }
})

export const { login, logout } = homeDataSlice.actions
export const selectHomeData = (state: RootState) => state.homeData
export default homeDataSlice.reducer