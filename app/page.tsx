"use client"

import { getStorageData, setStorageData } from '@/resources/local_storage';
import { getNormalizedConnections } from '@/resources/mongodb/models/connections';
import { deleteSession, getSessionById, updateSession } from '@/resources/mongodb/models/sessions';
import { getUserById } from '@/resources/mongodb/models/users';
import { useAppDispatch } from '@/resources/redux/hooks';
import { setHome } from '@/resources/redux/reducers';
import { SessionType, UserType } from '@/resources/types';
import { normalizeUser } from '@/resources/types/converter';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const StartupPage = () => {
    const navigate = useRouter();
    const dispatch = useAppDispatch();

    const handleAppStartup = async () => {
        const sessionId = await getStorageData('sessionId');
        if (sessionId?.length !== 24) {
            await gotoAuth();
            return;
        }
        const session: SessionType | null = await getSessionById(sessionId);
        if (!session) {
            await gotoAuth();
            return;
        }
        if ((new Date(session.invalidAt)).getTime() < (new Date).getTime()) {
            await deleteSession(sessionId);
            await gotoAuth();
            return;
        }
        const user: UserType | null = await getUserById(session.userId);
        await updateSession(sessionId, {invalidAt: new Date((new Date()).getTime() + user!.logoutAfter)});
        dispatch(setHome({user: await normalizeUser(user!), connections: await getNormalizedConnections(user!.id, user!.connectionsIds)}));
        // if user first time go to tutorial
        navigate.push('/home');
    }

    const gotoAuth = async () => { 
        await setStorageData('sessionId', null);
        navigate.push('/auth/login');
    }

    useEffect(() => {
        handleAppStartup();
    }, [])

    return (
        <div>

        </div>
    )
}

export default StartupPage