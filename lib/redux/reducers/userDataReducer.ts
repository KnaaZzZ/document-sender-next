import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserType, ConnectionType } from '../../types/index'

type UserDataType = {
  user: UserType | null,
  connections: ConnectionType[]
}

const initialState : UserDataType = {
  user: null,
  connections: []
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login : (state, action: PayloadAction<UserDataType>) => {
      state = action.payload;
    },
    logout : state => {
        state = initialState;
    }
  }
})

export const { login, logout } = userDataSlice.actions
export const selectUserData = (state: RootState) => state.userData
export default userDataSlice.reducer