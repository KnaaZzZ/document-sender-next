import { ConnectionType } from "@/other/types"

export const getConnectionById = async (id: string) => {
    const connection: ConnectionType = {
        id: "",
        usersIds: [],
        requests: [],
        messages: []
    }
    return connection;
}

export const getConnectionsById = async (ids: string[]) => {
    let connections: ConnectionType[] = [];
    for (let i = 0; i < ids.length; i++) {
        connections.push(await getConnectionById(ids[i]));
    }
    return connections;
}