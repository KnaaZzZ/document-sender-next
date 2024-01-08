import { UserType } from "@/other/types"

export const createUser = async (user: UserType) => {
    return user;
}

export const getUserById = async (id: string) => {
    const user: UserType = {
        id: "",
        name: "",
        email: "",
        password: "",
        connectionsIds: [],
        savedDocuments: [],
        logs: [],
        verification: false,
        firstTime: false,
        sessionId: "",
        logoutAfter: 0
    }
    return user;
}

export const getUserByEmail = async (email: string) => {
    const user: UserType = {
        id: "",
        name: "",
        email: "",
        password: "",
        connectionsIds: [],
        savedDocuments: [],
        logs: [],
        verification: false,
        firstTime: false,
        sessionId: "",
        logoutAfter: 0
    }
    return user;
}