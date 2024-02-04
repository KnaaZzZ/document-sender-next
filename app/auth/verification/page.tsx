"use client"

import { getStorageData, setStorageData } from '@/resources/local_storage';
import { getNormalizedConnections } from '@/resources/mongodb/models/connections';
import { deleteUser } from '@/resources/mongodb/models/users';
import { useAppDispatch, useAppSelector } from '@/resources/redux/hooks';
import { clearAuth, setHome, setUser } from '@/resources/redux/reducers';
import { normalizeUser } from '@/resources/types/converter';
import { handleCreateSession, hashString } from '@/resources/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, use, useEffect, useState } from 'react'

const VerificationPage = () => {
    const navigate = useRouter();
    const auth = useAppSelector(state => state.auth);
    const home = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    const initialPageData = {
        token: "",
        error: ""
    }
    const [pageData, setPageData] = useState(initialPageData);

    useEffect(() => {
        if (!auth.user) {
            exit();
        }
    }, [])

    useEffect(() => {
        if (pageData.token.length >= 6) {
            handleTokenInputed();
        }
    }, [pageData.token])

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 6) {
            setPageData({...pageData, error: 'Key should consist of 6 digits.'});
            return;
        }
        if (!(/^\d+$/.test(e.target.value) || e.target.value === "")) {
            setPageData({...pageData, error: 'Key consists digits only.'});
            return;
        }
        setPageData({...pageData, token: e.target.value, error: ''});
    }

    const handleTokenInputed = async () => {
        if (auth.token !== hashString(pageData.token)) {
            setPageData({...pageData, error: "Wrong token."})
            return;
        }
        const sessionId = await handleCreateSession(auth.user!);
        await dispatch(setUser({...auth.user! , sessionId: sessionId}));
        if (auth.remember) {
            await setStorageData("sessionId", sessionId);
        }
        const user = await normalizeUser(auth.user!);
        const connections = await getNormalizedConnections(auth.user!.id, auth.user!.connectionsIds)
        await dispatch(setHome({user: user, connections: connections}));
        await dispatch(clearAuth());
        // if user first time go to tutorial
        navigate.push('/home');
    }

    const exit = async () => {
        dispatch(clearAuth());
        if (auth.method === "register") {
            await deleteUser(auth.user!.id);
            navigate.push('/auth/register');
            return;
        }
        navigate.push('/auth/login');
    }

    return (
        <div>
            <button onClick={() => {exit()}}>Go Back</button>
            <input value={pageData.token} onChange={(e) => {handleInputChange(e)}}/>
            <div>{pageData.error}</div>

        </div>
    )
}

export default VerificationPage