import { setStorageData } from "../local_storage";
import { createSession, deleteSession } from "../mongodb/models/sessions";
import { updateUser } from "../mongodb/models/users";
import { SessionType, UserType } from "../types";

export const generateToken = (digitNumber: number) => {
    return Math.floor((Math.random() * 9 + 1) * Math.pow(10, digitNumber - 1)).toString();
}

export const handleVerificationToken = async (name: string, email: string) => {
    const token = generateToken(6);
    await sendEmail('service_q4f5789', 'template_34b5oof', 'l2VXqOJwJCNyZ3K3_', {to_email: email, to_name: name, token: token});
    return token;
}

export const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hash = (hash * 31) + charCode;
    }


    return hash.toString(16);
}

export const isValidName = (name: string) => {
    return /^[a-zA-Z_\-\.\u00C0-\u00FF\u0400-\u052F\u0600-\u06FF\u0700-\u074F\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0F7F\u1000-\u107F\u1080-\u10FF\u1100-\u11FF\u1200-\u127F\u1300-\u137F\u1380-\u13FF\u1400-\u14FF\u1500-\u157F\u1580-\u15FF\u1600-\u167F\u1680-\u16FF\u1700-\u177F\u1780-\u17FF\u1800-\u187F\u1880-\u18FF\u1900-\u197F\u1980-\u19FF\u1A00-\u1A7F\u1B00-\u1B7F\u1D00-\u1D7F\u1E00-\u1EFF\u1F00-\u1FFF]{3,35}$/.test(name);
 } 

export const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const isValidPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/.test(password);
}

export const normalizeEmail = (email: string) => {
    return email;
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
        return await res.json();
    } catch (e) {
        return null
    }
}

export const handleCreateSession = async (user: UserType) => {
    if (user.sessionId !== "") {
        await deleteSession(user.sessionId);
    }
    const session: SessionType = {
        id: "",
        invalidAt: new Date((new Date()).getTime() + user.logoutAfter),
        userId: user.id,
        token: ""
    }
    const response = await createSession(session);
    await updateUser(user.id, {sessionId: response!.id});
    return response!.id;
}