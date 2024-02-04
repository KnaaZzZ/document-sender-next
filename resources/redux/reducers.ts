import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ConnectionType, UserType } from "../types"

type HomeType = {
    user: UserType | null,
    connections: ConnectionType[]
}

type AuthType = {
    name: string,
    email: string,
    remember: boolean,

    token: string,
    user: UserType | null,
    method: string
}

const homeInitialState: HomeType = {
    user: null,
    connections: []
}

const authInitialState: AuthType = {
    name: ".",
    email: "",
    remember: false,
    token: "",
    user: null,
    method: ""
}

export const homeSlice = createSlice({
    name: 'home',
    initialState: homeInitialState,
    reducers: {
        setHome: (state, action: PayloadAction<HomeType>) => {
            return {...state, ...action.payload};
        },
        clear: (state) => {
            return {...state, ...homeInitialState}
        }
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            return {...state, name: action.payload};
        },
        setEmail: (state, action: PayloadAction<string>) => {
            return {...state, email: action.payload};
        },
        setRemember: (state) => {
            return {...state, remember: !state.remember};
        },
        setToken: (state, action: PayloadAction<string>) => {
            return {...state, token: action.payload};
        },
        setUser: (state, action: PayloadAction<UserType | null>) => {
            return {...state, user: action.payload};
        },
        setMethod: (state, action: PayloadAction<string>) => {
            return {...state, method: action.payload};
        },
        clear: (state) => {
            return {...state, ...authInitialState, name: state.name, email: state.email, remember: state.remember};
        }
    }
})

export const { setHome, clear: clearHome } = homeSlice.actions;
export const { setName, setEmail, setRemember, setToken, setUser, setMethod, clear: clearAuth } = authSlice.actions;

