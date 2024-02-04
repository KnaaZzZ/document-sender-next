import { ConnectionType, SessionType, UserType } from "."
import { getUserById } from "../mongodb/models/users";

export const userSchemaToType = (userSchema: any) => {
    if (!userSchema) {
        return null;
    }
    const user: UserType = {
        id: userSchema._id,
        sessionId: userSchema.sessionId,
        name: userSchema.name,
        email: userSchema.email,
        password: userSchema.password,
        connectionsIds: userSchema.connectionsIds,
        pendingConnectionsIds: userSchema.pendingConnectionsIds,
        pendingConnections: [[], []],
        savedDocuments: userSchema.savedDocuments,
        logs: userSchema.logs,
        verification: userSchema.verification,
        firstTime: userSchema.firstTime,
        logoutAfter: userSchema.logoutAfter
    }
    return user;
}

export const connectionSchemaToType = (connectionSchema: any) => {
    if (!connectionSchema) {
        return null;
    }
    const connection: ConnectionType = {
        id: connectionSchema._id,
        usersIds: connectionSchema.usersIds,
        connectionUser: null,
        userIndex: 0,
        requests: connectionSchema.requests
    }
    return connection;
}

export const sessionSchemaToType = (sessionSchema: any) => {
    if (!sessionSchema) {
        return null;
    }
    const session: SessionType = {
        id: sessionSchema._id,
        invalidAt: sessionSchema.invalidAt,
        userId: sessionSchema.userId,
        token: sessionSchema.token
    }
    return session;
}

export const normalizeUser = async (user: UserType) => {
    for (let i = 0; i < user.pendingConnectionsIds.length; i++) {
        for (let j = 0; j < user.pendingConnectionsIds[i].length; j++) {
            const connection = await getUserById(user.pendingConnectionsIds[i][j]);
            if (connection) {
                user.pendingConnections[i].push(connection);
            }
        }
    }
    return user;
}

export const normalizeConnection = async (userId: string, connection: ConnectionType) => {
    connection.userIndex = connection.usersIds[0] === userId ? 0 : 1;
    connection.connectionUser = await getUserById(connection.usersIds[connection.userIndex === 1 ? 0 : 1]);
    return connection;
}