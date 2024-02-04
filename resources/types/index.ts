export type UserType = {
    id: string,

    name: string,
    email: string,
    password: string,

    connectionsIds: string[],
    pendingConnectionsIds: string[][],
    pendingConnections: UserType[][]

    savedDocuments: SavedDocumentType[],
    logs: LogType[],
    
    sessionId: string,
    verification: boolean,
    firstTime: boolean,
    logoutAfter: number,
}

export type SavedDocumentType = {
    name: string,
    path: string
}

export type LogType = {

}

export type ConnectionType = {
    id: string,

    usersIds: string[],
    connectionUser: UserType | null,
    userIndex: number,

    requests: RequestsType[][]
}

export type RequestsType = {

}

export type SessionType = {
    id: string,

    invalidAt: Date,

    userId: string,

    token: string
}
