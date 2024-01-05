import { ConnectionType, UserType } from "@/other/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type HomeType = {
    user: UserType | null,
    connections: ConnectionType[]
}
const initialState: HomeType = {
    user: null,
    connections: []
}

export const homeSlice = createSlice({
    name: "home",
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

export const { login, logout } = homeSlice.actions;
export default homeSlice.reducer;