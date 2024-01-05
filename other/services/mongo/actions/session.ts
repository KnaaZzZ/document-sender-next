import { SessionType } from "@/other/types"

export const getSessionById = async (id: string) => {
    const session: SessionType = {
        id: "",
        userId: "",
        invalidTime: new Date
    }
    return session;
}

export const deleteSessionById = async (id: string) => {

}