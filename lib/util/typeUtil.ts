import { getUserById } from "../services/mongodb";
import { ConnectionType, UserType } from "../types";

export const normalizedUser = (user : any) => {
    const normalizedUser : UserType = {
        email: user.email,
        password: user.password
    }
    return normalizedUser;
}

export const normalizedConnection = (connection : any, userId : string) => {
    const userIndex = connection.usersIds[0] === userId ? 1 : 0;
    const users = [normalizedUser(getUserById(connection.usersIds[0])), normalizedUser(getUserById(connection.usersIds[1]))]
    const normalizedConnection : ConnectionType = {
        userIndex: userIndex,
        users: users
    }
    return normalizedConnection;
}

export const normalizedConnections = (connections : any, userId : string) => {
    var normalizedConnections : ConnectionType[] = [];
    for (let i = 0; i < connections.length; i++) {
        normalizedConnections.push(normalizedConnection(connections[i], userId)); 
    }
    return normalizedConnections;
}