"use client"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setEmail } from '@/lib/redux/reducers/authDataReducer';
import { login } from '@/lib/redux/reducers/userDataReducer';
import { getConnectionsByIds, getUserByEmail } from '@/lib/services/mongodb';
import { hashedString, normalizedEmail } from '@/lib/util/loginUtil';
import { normalizedConnections, normalizedUser } from '@/lib/util/typeUtil';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const authData = useAppSelector(state => state.authData);
    const userData = useAppSelector(state => state.userData);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const [password, setPassword] = useState("");

    const handleClick = () => {
        if (!primaryCheck()) {
            return;
        }
        const user : any = getUserByEmail(hashedString(normalizedEmail(authData.email)));
        if (!user) {
            //user with such email does not exist
            return;
        }
        if (user.password !== hashedString(password)) {
            // wrong password
            return;
        }
        const connections : any = getConnectionsByIds(user.connectionsIds); 
        const data = {
            user: normalizedUser(user),
            connections: normalizedConnections(connections, user.id)
        }
        dispatch(login(data));
        router.push('/home');
    }

    const primaryCheck = () => {
        // check email type
        // check password length
        // check password type
        return true;
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