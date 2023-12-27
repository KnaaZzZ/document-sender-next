import { UserType } from "@/lib/types"

export const getUserById = async (id : string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/user/id/${id}`);
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export const getUserByEmail = async (email : string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/user/email/${email}`);
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async (id : string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/user/id/${id}`);
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export const updateUserById = async (id : string, user : UserType) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/user/id/${id}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({user})
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (user : UserType) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({user})
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}