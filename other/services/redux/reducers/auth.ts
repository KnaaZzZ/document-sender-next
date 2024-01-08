import { ConnectionType, UserType } from "@/other/types"
import { hashString } from "@/other/utils/auth"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type AuthType = {
    name: string,
    email: string,

    user: UserType | null,
    userId: string,

    token: string
}
const initialState: AuthType = {
    name: "",
    email: "",

    user: null,
    userId: "",

    token: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUser: (state, action: PayloadAction<UserType | null>) => {
            state.user = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = hashString(action.payload);
        },
        clear: (state) => {
            state = initialState;
        }
    }
})

export const { setName, setEmail, setUser, setUserId, setToken, clear } = authSlice.actions;
export default authSlice.reducer;