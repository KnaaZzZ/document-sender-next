export type UserType = {
    id?: string,

    email: string,
    password: string,

    connectionsIds: string[]
}

export type ConnectionType = {
    id?: string,

    usersIds: string[],
    users?: UserType[]
}