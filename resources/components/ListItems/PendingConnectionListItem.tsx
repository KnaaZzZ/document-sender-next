import { UserType } from '@/resources/types'
import React from 'react'

type PendingConnectionListItemType = {
    index: string,
    data: {pendingConnection: UserType, in: boolean},
    handleClick: (key: string) => void
}
const PendingConnectionListItem = ({index, data, handleClick}: PendingConnectionListItemType) => {

    return (
        <div>
            <div>{data.pendingConnection.name}</div>
            <div>{data.pendingConnection.email}</div>
            <div>
                {data.in ? 
                    <div>
                        <button onClick={() => handleClick(`A ${index}`)}>Accept</button>
                        <button onClick={() => handleClick(`R ${index}`)}>Reject</button>
                    </div>
                    : 
                    <button onClick={() => handleClick(`C ${index}`)}>Cancel</button>
                }
            </div>
        </div>
    )
}

export default PendingConnectionListItem