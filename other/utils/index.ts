import { getUserById } from "../services/mongo/actions/user";
import { ConnectionType } from "../types";

export const normalizeConnections =  async (connections: ConnectionType[], userId: string) => {
    for (let i = 0; i < connections.length; i++) {
        connections[i].userIndex = connections[i].usersIds[0] === userId ? 0 : 1;
        connections[i].users = [await getUserById(connections[i].usersIds[0]), await getUserById(connections[i].usersIds[1])];
    }
    return connections;
}