"use client"

import { getStorageData, setStorageData } from '@/other/services/local_storage';
import { getConnectionsById } from '@/other/services/mongo/actions/connection';
import { deleteSessionById, getSessionById } from '@/other/services/mongo/actions/session';
import { getUserById } from '@/other/services/mongo/actions/user';
import { login } from '@/other/services/redux/reducers/home';
import { ConnectionType, SessionType, UserType } from '@/other/types';
import { normalizeConnections } from '@/other/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const StartPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    
    const handleAppStartup = async () => {
        const sessionId = await getStorageData('sessionId');
        if (!sessionId) {
            await gotoAuth();
            return;
        }
        const session: SessionType = await getSessionById(sessionId);
        if (!session) {
            await gotoAuth();
            return;
        }
        if (session.invalidTime.getTime() > (new Date).getTime()) {
            await deleteSessionById(sessionId);
            await gotoAuth();
            return;
        }
        const user: UserType = await getUserById(session.userId);
        const connections: ConnectionType[] = await getConnectionsById(user.connectionsIds);
        dispatch(login({user: user, connections: await normalizeConnections(connections, user.id)}));
        router.push('/home');
    }

    const gotoAuth = async () => {
        await setStorageData('sessiondId', null);
        router.push('/auth/login');
    }

    useEffect(() => {
        handleAppStartup();
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default StartPage