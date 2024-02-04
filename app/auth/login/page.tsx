"use client"

import { setStorageData } from '@/resources/local_storage';
import { getNormalizedConnections } from '@/resources/mongodb/models/connections';
import { getUserByEmail } from '@/resources/mongodb/models/users';
import { useAppDispatch, useAppSelector } from '@/resources/redux/hooks'
import { clearAuth, setEmail, setHome, setMethod, setRemember, setToken, setUser } from '@/resources/redux/reducers';
import { UserType } from '@/resources/types';
import { normalizeUser } from '@/resources/types/converter';
import { handleCreateSession, handleVerificationToken, hashString, isValidEmail, isValidPassword } from '@/resources/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const navigate = useRouter();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const initialPageData = {
        password: "",

        eEmail: "",
        ePassword: ""
    }
    const [pageData, setPageData] = useState(initialPageData);

    const handleClick = async () => {
        const response = await handleLoginChecks();
        if (!response) {
            return;
        } 
        if (response.verification) {
            dispatch(setToken(hashString(await handleVerificationToken(auth.name, auth.email))));
            dispatch(setUser(response)); dispatch(setMethod('login'));
            navigate.push('/auth/verification');
            return;
        }
        const sessionId = await handleCreateSession(auth.user!);
        if (auth.remember) {
            await setStorageData("sessionId", sessionId);
        }
        const user = await normalizeUser(response);
        const connections = await getNormalizedConnections(response.id, response.connectionsIds)
        await dispatch(setHome({user: user, connections: connections}));
        await dispatch(clearAuth());
        // if user first time go to tutorial
        navigate.push('/home');
    }

    const handleLoginChecks = async () => {
        const errors = {eEmail: "", ePassword: ""};
        let errorExists = false;
        if (!isValidEmail(auth.email)) {
            errors.eEmail = "Provided email is of wrong type (see example: example@domain.com)."
            errorExists = true;
        }
        if (!isValidPassword(pageData.password)) {
            errors.ePassword = "Password should have upper and lower letter, digit, symbol and length between 6 and 16 including."
            errorExists = true;
        }
        if (errorExists) {
            setPageData({...pageData, ...errors});
            return null;
        }
        const user: UserType | null = await getUserByEmail(auth.email);
        if (!user) {
            setPageData({...pageData, eEmail: "User with given email does not exist."});
            return null;
        }
        if (user.password !== hashString(pageData.password)) {
            setPageData({...pageData, ePassword: "Wrong password."});
            return null;
        }
        return user;
    }

    return (
        <div>
            <input value={auth.email} onChange={(e) => {dispatch(setEmail(e.target.value)); setPageData({...pageData, eEmail: ""})}}/>
            <div>
                {pageData.eEmail}
            </div>
            <input type='password' value={pageData.password} onChange={(e) => {setPageData({...pageData, password: e.target.value, ePassword: ""})}}/>
            <div>
                {pageData.ePassword}
            </div>
            <input type='checkbox' checked={auth.remember} onChange={() => dispatch(setRemember())}/>
            <button onClick={() => {handleClick()}}>Login</button>
            <div>or</div>
            <Link href={'/auth/register'}>Register</Link>
        </div>
    )
}

export default LoginPage