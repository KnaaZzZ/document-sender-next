"use client"

import { getNormalizedConnections } from '@/resources/mongodb/models/connections';
import { getUserById } from '@/resources/mongodb/models/users';
import { useAppDispatch, useAppSelector } from '@/resources/redux/hooks'
import { setHome } from '@/resources/redux/reducers';
import { normalizeUser } from '@/resources/types/converter';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    const navigate = useRouter();
    const home = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!home.user) {
            navigate.push('/');
            return;
        }
        const interval = setInterval(async () => {
            const response = await getUserById(home.user!.id)
            const user = await normalizeUser(response!);
            const connections = await getNormalizedConnections(user.id, user.connectionsIds);
            dispatch(setHome({user: user, connections: connections}));
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default HomeLayout