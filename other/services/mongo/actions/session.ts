import { SessionType } from "@/other/types"

export const createSession = (session: SessionType) => {

}

export const getSessionById = async (id: string) => {
    const session: SessionType = {
        id: "",
        userId: "",
        invalidAt: new Date
    }
    return session;
}

export const deleteSessionById = async (id: string) => {

}

export const updateSessionById = async (id: string, value: any) => {

}