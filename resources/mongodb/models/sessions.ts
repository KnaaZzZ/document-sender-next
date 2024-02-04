import { sessionSchemaToType } from "@/resources/types/converter";
import { SessionType } from "../../types";

export const createSession = async (session: SessionType) => {
    try {
        const res = await fetch(`http://localhost:3000/api/sessions`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({session})
        });
        return sessionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const getSessionById = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/sessions/id/${id}`);
        return sessionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const getSessionByToken = async (token: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/sessions/token/${token}`);
        return sessionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const updateSession = async (id: string, change: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/sessions/id/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({change})
        });
        return sessionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const deleteSession = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/sessions/id/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            }
        });
        return sessionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}