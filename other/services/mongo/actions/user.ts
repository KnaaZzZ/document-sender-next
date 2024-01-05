import { UserType } from "@/other/types"

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
        sessionId: ""
    }
    return user;
}