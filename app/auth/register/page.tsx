"use client"

import { createUser, getUserByEmail } from '@/resources/mongodb/models/users';
import { useAppDispatch, useAppSelector } from '@/resources/redux/hooks'
import { setEmail, setMethod, setName, setRemember, setToken, setUser } from '@/resources/redux/reducers';
import { UserType } from '@/resources/types';
import { isValidName, isValidEmail, isValidPassword, normalizeEmail, handleVerificationToken, hashString } from '@/resources/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    const navigate = useRouter();
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const initialPageData = {
        rEmail: "",
        password: "",
        rPassword: "",

        eName: "",
        eEmail: "",
        ePassword: ""
    }
    const [pageData, setPageData] = useState(initialPageData);

    const handleClick = async () => {
        if (!(await handleRegisterChecks())) {
            return;
        }
        const user: UserType = {
            id: '',
            name: auth.name,
            email: auth.email,
            password: hashString(pageData.password),

            connectionsIds: [],
            pendingConnectionsIds: [[], []],
            pendingConnections: [],

            savedDocuments: [],
            logs: [],

            sessionId: '',
            verification: false,
            firstTime: true,
            logoutAfter: 3600000
        }
        const res = await createUser(user);
        user.id = res!.id;
        dispatch(setToken(hashString(await handleVerificationToken(auth.name, auth.email))));
        dispatch(setUser(user)); dispatch(setMethod('register'));
        navigate.push('/auth/verification');
    }

    const handleRegisterChecks = async () => {
        const errors = {eName: "", ePassword: "", eEmail: ""};
        let errorExists = false;
        if (!isValidName(auth.name.split(".")[0]) || !isValidName(auth.name.split(".")[1])) {
            errors.eName = "Name or surname of wrong type. Please use English characters and length must be between 3 and 35 characters."
            errorExists = true;
        }
        if (auth.email !== pageData.rEmail) {
            errors.eEmail = "Emails do not match."
            errorExists = true;
        }
        if (!isValidEmail(auth.email)) {
            errors.eEmail = "Provided email is of wrong type (see example: example@domain.com)."
            errorExists = true;
        }
        if (pageData.password !== pageData.rPassword) {
            errors.ePassword = "Passwords do not match."
            errorExists = true;
        }
        if (!isValidPassword(pageData.password)) {
            errors.ePassword = "Password should have upper and lower letter, digit, symbol and length between 6 and 16 including."
            errorExists = true;
        }
        if (errorExists) {
            setPageData({...pageData, ...errors});
            return false;
        }
        const user: UserType | null = await getUserByEmail(normalizeEmail(auth.email));
        if (user) {
            setPageData({...pageData, eEmail: "User with given email already exists."})
            return false;
        }
        return true;
    }

    return (
        <div>
            <div>
                <input value={auth.name.split(".")[0]} onChange={(e) => {dispatch(setName(e.target.value + "." + auth.name.split(".")[1])); setPageData({...pageData, eName: ""})}}/>
                <input value={auth.name.split(".")[1]} onChange={(e) => {dispatch(setName(auth.name.split(".")[0] + "." + e.target.value));  setPageData({...pageData, eName: ""})}}/>
            </div>
            <div>{pageData.eName}</div>
            <input value={auth.email} onChange={(e) => {dispatch(setEmail(e.target.value)); setPageData({...pageData, eEmail: ""})}}/>
            <input value={pageData.rEmail} onChange={(e) => {setPageData({...pageData, rEmail: e.target.value, eEmail: ""})}}/>
            <div>{pageData.eEmail}</div>
            <input type='password' value={pageData.password} onChange={(e) => {setPageData({...pageData, password: e.target.value, ePassword: ""})}}/>
            <input type='password' value={pageData.rPassword} onChange={(e) => {setPageData({...pageData, rPassword: e.target.value, ePassword: ""})}}/>
            <div>{pageData.ePassword}</div>
            <input type='checkbox' checked={auth.remember} onChange={() => {dispatch(setRemember())}}/>
            <button onClick={() => handleClick()}>Register</button>
            <div>or</div>
            <Link href={'/auth/login'}>Login</Link>
        </div>
    )
}

export default RegisterPage