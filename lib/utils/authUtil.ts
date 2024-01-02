import { getConnectionById } from "../services/mongodb";
import { ConnectionType, UserType } from "../types";

export const sendEmail = async (service_id: string, template_id: string, user_id: string, template_params: any) => {
    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: '',
                template_id: '',
                user_id: '',
                template_params: template_params
            })
        })
    } catch (e) {
        console.log(e);
    }
}

export const getUser = (user: any) => {
    const returnUser: UserType = {
        verification: user.verification
    } 
    return returnUser;
}

export const getConnection = (connection: any, userId: string) => {
    const returnConnection: ConnectionType = {

    }
    return returnConnection;
}

export const getConnections = (connectionsIds: string[], userId: string) => {
    var connections: ConnectionType[] = [];
    for (let i = 0; i < connectionsIds.length; i++) {
        connections.push(getConnection(getConnectionById(connectionsIds[i]), userId));
    }
    return connections;
}