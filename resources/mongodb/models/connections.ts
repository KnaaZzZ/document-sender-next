import { connectionSchemaToType, normalizeConnection } from "@/resources/types/converter";
import { ConnectionType } from "../../types";

export const createConnection = async (connection: ConnectionType) => {
    try {
        const res = await fetch(`http://localhost:3000/api/connections`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({connection})
        });
        return connectionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const getConnection = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/connections/id/${id}`);
        return connectionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const getNormalizedConnections = async (userId: string, ids: string[]) => {
    const connections: ConnectionType[] = [];
    for (let i = 0; i < ids.length; i++) {
        const connection = await getConnection(ids[i]);
        connections.push(await normalizeConnection(userId, connection!));
    }
    return connections;
}

export const updateConnection = async (id: string, change: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/connections/id/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({change})
        });
        return connectionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}

export const deleteConnection = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/connections/id/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            }
        });
        return connectionSchemaToType(await res.json());
    } catch (error) {
        return null;
    }
}