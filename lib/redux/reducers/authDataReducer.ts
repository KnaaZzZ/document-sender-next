import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserType, ConnectionType } from '../../types/index'

type AuthDataType = {
    name: string,
    surname: string,
    email: string
}

const initialState : AuthDataType = {
  name: "",
  surname: "",
  email: ""
}

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setName: (state, action : PayloadAction<string>) => {
        state.name = action.payload;
    },
    setSurname: (state, action : PayloadAction<string>) => {
        state.surname = action.payload;
    },
    setEmail: (state, action : PayloadAction<string>) => {
        state.email = action.payload;
    }
  }
})

export const { setName, setSurname, setEmail } = authDataSlice.actions
export const selectAuthData = (state: RootState) => state.authData
export default authDataSlice.reducer