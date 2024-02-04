"use client"

import PendingConnectionListItem from '@/resources/components/ListItems/PendingConnectionListItem';
import ListView from '@/resources/components/ListView';
import { useAppSelector } from '@/resources/redux/hooks';
import { ConnectionType, UserType } from '@/resources/types';
import { getUserById, updateUser } from '@/resources/mongodb/models/users';
import React from 'react'
import { createConnection } from '@/resources/mongodb/models/connections';
import { useRouter } from 'next/navigation';

const PendingConnectionPage = () => {
    const navigate = useRouter();
    const home = useAppSelector(state => state.home);

    const handleClick = async (key: string) => {
        const keyArr = key.split(" ");
        switch (keyArr[0]) {
            case 'A':
                const connection: ConnectionType = {
                    usersIds: [home.user!.id!, home.user!.pendingConnectionsIds[1][parseInt(keyArr[1])]],
                    id: '',
                    requests: [[], []],
                    connectionUser: null,
                    userIndex: 0
                }
                const response = await createConnection(connection);
                await updateUser(home.user!.id!, {connectionsIds: [...home.user!.connectionsIds, response!.id]});
                const user = await getUserById(home.user!.pendingConnectionsIds[1][parseInt(keyArr[1])]);
                await updateUser(home.user!.pendingConnectionsIds[1][parseInt(keyArr[1])], {connectionsIds: [...user!.connectionsIds, response!.id]});
                await removePendingConnection(1, parseInt(keyArr[1]));
                break;
            case 'R':
                await removePendingConnection(1, parseInt(keyArr[1]));
                break;
            case 'C':
                await removePendingConnection(0, parseInt(keyArr[1]));
                break;
        }
        navigate.push('/home');
    }

    const removePendingConnection = async (index0: number, index1: number) => {
        console.log('a')
        await updatePendingConnections(home.user!, index0, index1);
        console.log('b')
        const user = await getUserById(home.user!.pendingConnectionsIds[index0][index1]);
        for (let i = 0; i < user!.pendingConnectionsIds[index0 === 1 ? 0 : 1].length; i++) {
            if (user!.pendingConnectionsIds[index0 === 1 ? 0 : 1][i] === home.user!.id) {
                await updatePendingConnections(user!, index0 === 1 ? 0 : 1, i);
                break;
            }
        }
        console.log('c')
    }

    const updatePendingConnections = async (user: UserType, index0: number, index1: number) => {
        if (index0 === 0) {
            await updateUser(user.id!, {pendingConnectionsIds: [user.pendingConnectionsIds[index0].filter((_, i) => i !== index1), user.pendingConnectionsIds[1]]});
        } else {
            await updateUser(user.id!, {pendingConnectionsIds: [user.pendingConnectionsIds[0], user.pendingConnectionsIds[index0].filter((_, i) => i !== index1)]});
        }
    }
    

    const pendingConnectionsToData = (i: number) => {
        const data: {pendingConnection: UserType, in: boolean}[] = [];
        home.user!.pendingConnections[i].map((pendingConnection) => {
            data.push({pendingConnection: pendingConnection, in: i === 1 ? true : false});
        })
        return data;
    }

    return (
        <div>
            <ListView title='Sent Connection Requests' data={pendingConnectionsToData(0)} ListItem={PendingConnectionListItem} handleClick={(key) => {handleClick(key)}}/>
            <ListView title='Pending Connection Requests' data={pendingConnectionsToData(1)} ListItem={PendingConnectionListItem} handleClick={(key) => {handleClick(key)}}/>
        </div>
    )
}

export default PendingConnectionPage