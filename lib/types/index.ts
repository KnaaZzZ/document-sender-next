export type UserType = {
    email: string,
    password: string,
}

export type ConnectionType = {
    userIndex: number
    users: UserType[]
}