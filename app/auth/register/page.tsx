"use client"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setEmail, setMethod, setName, setPassword, setToken } from '@/lib/redux/reducers/authDataReducer';
import { getUserByEmail } from '@/lib/services/mongodb';
import { hashedString, normalizedEmail } from '@/lib/util/authUtil';
import { error } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

const RegisterPage = () => {
    const authData = useAppSelector(state => state.authData);
    const dispatch = useAppDispatch();
    
    const router = useRouter();

    const initialData = {
        name: "",
        surname: "",
        email: "",
        password: "",
        rePassword: ""
    }

    const [errorData, setErrorData] = useState(initialData);
    const [registerData, setRegisterData] = useState(initialData);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
        setErrorData({...errorData, [e.target.name]: ""});
    }

    useEffect(() => {
        dispatch(setEmail(registerData.email));
    }, [registerData.email])

    useEffect(() => {
        dispatch(setName(registerData.name + " " + registerData.surname));
    }, [registerData.name, registerData.surname])

    const handleClick =  async () => {
        if (!checks()) {
            return;
        }
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        // send token to email
        dispatch(setPassword(hashedString(registerData.password)));
        dispatch(setToken(token));
        dispatch(setMethod("login"));
        router.push('/auth/verification');
    }

    const checks = async () => {
        // please insert real name
        // please insert real surname
        // email wrong type
        // password wrong type
        // password does not match

        const { checkUser } : any = await getUserByEmail(hashedString(normalizedEmail(authData.email)));
        if (checkUser) {
            // user with given email already exists
            return;
        }
        return true;         
    }

    return (
        <div>
            <input name='name' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.name}</div>
            <input name='surname' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.surname}</div>
            <input name='email' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.email}</div>
            <input name='password' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.password}</div>
            <input name='rePassword' type='text' value={authData.email} onChange={handleChange}/>
            <div>{errorData.rePassword}</div>
            <button onClick={handleClick}>CREATE ACCOUNT</button>
            <Link href={'/auth/login'}>LOGIN</Link>
        </div>
    )
}

export default RegisterPage