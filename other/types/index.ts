export type UserType = {
    id: string,

    name: string,
    email: string,
    password: string,

    connectionsIds: string[],
    savedDocuments: SavedDocumentType[],
    logs: ChangeType[],

    verification: boolean,
    firstTime: boolean,
    sessionId: string,

    logoutAfter: number // 3600000 is hour
}

export type SavedDocumentType = {

}

export type ChangeType = {

}

export type ConnectionType = {
    id: string,

    userIndex?: number
    usersIds: string[],
    users?: UserType[]
    
    requests: RequestType[][],
    messages: MessageType[]
}

export type RequestType = {

}

export type MessageType = {

}

export type SessionType = {
    id: string,

    userId: string,

    invalidAt: Date // to change
}