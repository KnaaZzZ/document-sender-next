export type UserType = {
    name: string,
    email: string,
    password: string
}

export type ConnectionType = {
    userIndex: number,
    users: UserType[]
}