"use client"

import { useAppDispatch, useAppSelector } from '@/resources/redux/hooks';
import { SessionType, UserType } from '@/resources/types';
import { generateToken, hashString } from '@/resources/utils';
import { getSessionByToken, updateSession } from '@/resources/mongodb/models/sessions';
import { getUserById, updateUser } from '@/resources/mongodb/models/users';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

const AddConnectionPage = () => {
    const navigate = useRouter();

    const home = useAppSelector(state => state.home)
    const dispatch = useAppDispatch();

    type PageType = {
        inputToken: string,
        error: string,
        token: string,
        tokenVisibility: boolean
    }
    const initialPageData: PageType = {
        inputToken: '',
        error: '',

        token: '',
        tokenVisibility: false
    }
    const [pageData, setPageData] = useState<PageType>(initialPageData);

    useEffect(() => {
        const generate = async () => {
            var token;
            do {
                token = generateToken(6);
            }
            while (await getSessionByToken(hashString(token)))
            await updateSession(home.user!.sessionId, {token: hashString(token)})
            setPageData({...pageData, token: token});
        }
        generate();
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 6) {
            setPageData({...pageData, error: 'Key should consist of 6 digits.'});
            return;
        }
        if (!(/^\d+$/.test(e.target.value) || e.target.value === "")) {
            setPageData({...pageData, error: 'Key consists digits only.'});
            return;
        }
        setPageData({...pageData, inputToken: e.target.value, error: ''});
    }

    const handleMakeConnection = async () => {
        if (pageData.inputToken.length !== 6) {
            setPageData({...pageData, error: 'Key should consist of 6 digits.'})
            return;
        }
        const session: SessionType | null = await getSessionByToken(hashString(pageData.inputToken));
        if (!session) {
            setPageData({...pageData, error: 'No connection with given token exists.'})
            return;
        }
        if (inPendingConnections(session.userId, 0)) {
            setPageData({...pageData, error: 'You have already sent request to this user.'})
            return;
        }
        if (inPendingConnections(session.userId, 1)) {
            setPageData({...pageData, error: 'This user has sent you request. Goto pending connections tab.'})
            return;
        }
        if (inConnections(session.userId)) {
            setPageData({...pageData, error: 'You already have connection with this user.'})
            return;
        }
        await updatePendingConnections(home.user!, 0, session.userId)
        const user = await getUserById(session.userId);
        await updatePendingConnections(user!, 1, home.user!.id)
        navigate.push('/home');
    }

    const inPendingConnections = (id: string, index: number) => {
        for (let i = 0; i < home.user!.pendingConnectionsIds[index].length; i++) {
            if (home.user!.pendingConnectionsIds[index][i] === id) {
                return true;
            }
        }
        return false;
    }

    const inConnections = (id: string) => {
        for (let i = 0; i < home.connections.length; i++) {
            if (home.connections[i].connectionUser!.id === id) {
                return true;
            }
        }
        return false;
    }

    const updatePendingConnections = async (user: UserType, index: number, userId: string) => {
        let pendingConnectionsIds: string[][] = [];
        if (index === 0) {
            pendingConnectionsIds = [[...user.pendingConnectionsIds[0], userId], user.pendingConnectionsIds[1]]
        } else {
            pendingConnectionsIds = [user.pendingConnectionsIds[0], [...user.pendingConnectionsIds[1], userId]]
        }
        await updateUser(user.id!, {pendingConnectionsIds: pendingConnectionsIds});
    }

    return (
        <div>
            <input type='text' value={pageData.inputToken} onChange={(e) => {handleInputChange(e)}}/>
            <div>{pageData.error}</div>
            <button onClick={() => handleMakeConnection()}>Make connection.</button>
            <div>or</div>
            <button onClick={() => {setPageData({...pageData, tokenVisibility: !pageData.tokenVisibility})}}>{!pageData.tokenVisibility ? 'Show connection key' : pageData.token}</button>
        </div>
    )
}

export default AddConnectionPage