import { getUserById } from "../services/mongo/actions/user";
import { ConnectionType } from "../types";

export const normalizeConnections =  async (connections: ConnectionType[], userId: string) => {
    for (let i = 0; i < connections.length; i++) {
        connections[i].userIndex = connections[i].usersIds[0] === userId ? 0 : 1;
        connections[i].users = [await getUserById(connections[i].usersIds[0]), await getUserById(connections[i].usersIds[1])];
    }
    return connections;
}

export const sendEmail = async (serviceId: string, templateId: string, userId: string, templateParams: any) => {
    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: templateParams
            })
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}