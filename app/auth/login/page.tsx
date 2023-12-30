"use client"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setEmail, setMethod, setPassword, setToken } from '@/lib/redux/reducers/authDataReducer';
import { getUserByEmail } from '@/lib/services/mongodb';
import { hashedString, isValidEmail, isValidPassword, normalizedEmail } from '@/lib/util/authUtil';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

const LoginPage = () => {
    const authData = useAppSelector(state => state.authData);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const initialData = {
        email: "",
        password: ""
    }

    const [errorData, setErrorData] = useState(initialData);
    const [loginData, setLoginData] = useState(initialData);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
        setErrorData({...errorData, [e.target.name]: ""});
    }

    useEffect(() => {
        dispatch(setEmail(loginData.email));
    }, [loginData.email])

    const handleClick = () => {
        if (!checks()) {
            return;
        }
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        // send token to email
        dispatch(setPassword(hashedString(loginData.password)));
        dispatch(setToken(token));
        dispatch(setMethod("login"));
        router.push('/auth/verification');
    }

    const checks = async () => {
        var checkValid = true;
        var error = {
            email: "",
            password: ""
        }
        if (!isValidEmail(loginData.email)) {
            error.email = "Email provided is of wrong type (example@domain.com).";
            checkValid = false;
        }
        if (!isValidPassword(loginData.password)) {
            error.password = "Password should have at least 8 characters of length, including one number, lower and capital letter.";
            checkValid = false;
        }
        if (!checkValid) {
            return false;
        }
        setLoginData({...loginData, email: normalizedEmail(loginData.email)});
        const { user } : any = await getUserByEmail(normalizedEmail(loginData.email));
        if (!user) {
            setErrorData({...errorData, email: "User with given email, does not exist."})
            return false;
        }
        if (user.password !== hashedString(loginData.password)) {
            setErrorData({...errorData, password: "Wrong password."})
            return false;
        }
        return true;
    }

    return (
        <div>
            <input name='email' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.email}</div>
            <input name='password' type='password' value={loginData.password} onChange={handleChange}/>
            <div>{errorData.password}</div>
            <Link href={'/auth/forgot_password'}>Forgot Password?</Link>
            <button onClick={handleClick}>LOGIN</button>
            <Link href={'/auth/register'}>CREATE ACCOUNT</Link>
        </div>
    )
}

export default LoginPage