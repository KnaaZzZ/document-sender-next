import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserType, ConnectionType } from '../../types/index'

type AuthDataType = {
    name: string,
    email: string,
    password: string,
    token: string,

    method: string
}

const initialState : AuthDataType = {
  name: "",
  email: "",
  password: "",
  token: "",

  method: ""
}

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setName: (state, action : PayloadAction<string>) => {
        state.name = action.payload;
    },
    setEmail: (state, action : PayloadAction<string>) => {
        state.email = action.payload;
    },
    setPassword: (state, action : PayloadAction<string>) => {
      state.password = action.payload;
    },
    setToken: (state, action : PayloadAction<string>) => {
      state.token = action.payload;
    },
    setMethod: (state, action : PayloadAction<string>) => {
      state.method = action.payload;
    },
    clearAuthData: (state) => {
      state = initialState;
    }
  }
})

export const { setName, setEmail, setPassword, setMethod, clearAuthData } = authDataSlice.actions
export const selectAuthData = (state: RootState) => state.authData
export default authDataSlice.reducer