import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserType } from '@/lib/types'

type AuthType = {
    name: string,
    email: string,

    user: UserType | null,

    token: string,
    password: string
}

const initialState: AuthType = {
    email: '',
    name: '',

    user: null,

    token: '',
    password: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
        state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
        state.password = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
    },
  }
})

export const { setName, setEmail, setPassword, setUser, setToken } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer