"use client"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setEmail } from '@/lib/redux/reducers/authDataReducer';
import { login } from '@/lib/redux/reducers/userDataReducer';
import { getConnectionsByIds, getUserByEmail } from '@/lib/services/mongodb';
import { hashedString, isValidEmail, isValidPassword, normalizedEmail } from '@/lib/util/authUtil';
import { normalizedConnections, normalizedUser } from '@/lib/util/typeUtil';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

const LoginPage = () => {
    const authData = useAppSelector(state => state.authData);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const initialErrors = {
        email: "",
        password: ""
    }
    const [errors, setErrors] = useState(initialErrors);

    const initialLoginData = {
        password: ""
    }
    const [loginData, setLoginData] = useState(initialLoginData);

    const setData = (name : string, value : string) => {
        setLoginData({...loginData, [name]: value})
    }

    const setError = (name : string, value : string) => {
        setErrors({...errors, [name]: value})
    }

    const handleClick = async () => {
        if (!primaryCheck()) {
            return;
        }
        const { user } : any = await getUserByEmail(hashedString(normalizedEmail(authData.email)));
        if (!user) {
            setError("email", "User with given email, does not exist.")
            return;
        }
        if (user.password !== hashedString(loginData.password)) {
            setError("password", "Wrong password.")
            return;
        }
        const connections : any = await getConnectionsByIds(user.connectionsIds); 
        const data = {
            user: normalizedUser(user),
            connections: normalizedConnections(connections, user.id)
        }
        dispatch(login(data));
        router.push('/home');
    }

    const primaryCheck = () => {
        var returnBoolean = true;
        var error = {
            email: "",
            password: ""
        }
        if (!isValidEmail(authData.email)) {
            error.email = "Email provided is of wrong type (example@domain.com).";
            returnBoolean = false;
        }
        if (!isValidPassword(loginData.password)) {
            error.password = "Password should have at least 8 characters of length, including one number, lower and capital letter.";
            returnBoolean = false;
        }
        setErrors(error);
        return returnBoolean;
    }
    
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            dispatch(setEmail(e.target.value));
        } else {
            setData(e.target.name, e.target.value);
        }
        setError(e.target.name, "");
    }

    return (
        <div>
            <input name='email' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errors.email}</div>
            <input name='password' type='password' value={loginData.password} onChange={handleChange}/>
            <div>{errors.password}</div>
            <Link href={'/auth/forgot_password'}>Forgot Password?</Link>
            <button onClick={handleClick}>LOGIN</button>
            <Link href={'/auth/register'}>CREATE ACCOUNT</Link>
        </div>
    )
}

export default LoginPage