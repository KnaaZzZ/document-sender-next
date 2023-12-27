"use client"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setEmail } from '@/lib/redux/reducers/authDataReducer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
    const authData = useAppSelector(state => state.authData);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        
    }, [authData.email])

    const [password, setPassword] = useState("");

    const handleClick = () => {

    }

    return (
        <div>
            <input name='email' type='text' value={authData.email} onChange={(e) => {dispatch(setEmail(e.target.value))}}/>
            <input name='password' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <Link href={'/auth/forgot_password'}>Forgot Password?</Link>
            <button onClick={handleClick}>LOGIN</button>
            <Link href={'/auth/register'}>CREATE ACCOUNT</Link>
        </div>
    )
}

export default LoginPage