import { userSchemaToType } from "@/resources/types/converter";
import { UserType } from "../../types";

export const createUser = async (user: UserType) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({user})
        });
        return userSchemaToType(await res.json())
    } catch (error) {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/id/${id}`);
        return userSchemaToType(await res.json())
    } catch (error) {
        return null;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/email/${email}`);
        return userSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const updateUser = async (id: string, change: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/id/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({change})
        });
        return userSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const deleteUser = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/id/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            }
        });
        return userSchemaToType(await res.json())
    } catch (error) {
        return null;
    }
}