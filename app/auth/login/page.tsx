import { getConnectionsById } from '@/other/services/mongo/actions/connection';
import { createSession } from '@/other/services/mongo/actions/session';
import { getUserByEmail } from '@/other/services/mongo/actions/user';
import { useAppDispatch, useAppSelector } from '@/other/services/redux/hooks';
import { setToken, setUser } from '@/other/services/redux/reducers/auth';
import { login } from '@/other/services/redux/reducers/home';
import { UserType } from '@/other/types';
import { normalizeConnections, sendEmail } from '@/other/utils';
import { hashString } from '@/other/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const initialState = {
        email: "",
        password: ""
    }

    const [loginState, setLoginState] = useState({...initialState, email: auth.email});
    const [errorState, setErrorState] = useState(initialState);

    const handleClick = async () => {
        const user: UserType | null = await checks();
        if (!user) {
            return;
        }
        if (user.verification) {
            gotoVerification(user);
            return;
        }
        gotoHome(user);
    }

    const checkOne = () => {
        return true;
    }

    const checkTwo = async () => {
        const user: UserType | null = await getUserByEmail(loginState.email);
        if (!user) {
            // wrong email
            return null;
        }
        if (user.password !== hashString(loginState.password)) {
            // wrong password
            return null;
        }
        return user;
    }
    
    const checks = () => {
        if (!checkOne()) {
            return null;
        }
        return checkTwo();
    }

    const gotoVerification = async (user: UserType) => {
        dispatch(setUser(user));
        const token = Math.floor(Math.random() * 1000000).toString();
        await sendEmail('', '', '', {emailTo: '', token: token});
        dispatch(setToken(token));
        router.push('/auth/verification');
    }

    const gotoHome = async (user: UserType) => {
        const connections = await getConnectionsById(user.connectionsIds);
        await createSession({
            id: '',
            userId: user.id,
            invalidAt: new Date((new Date()).getTime() + user.logoutAfter)
        });
        dispatch(login({user: user, connections: await normalizeConnections(connections, user.id)}));
        router.push('/home');
    }

    return (
        <div>

        </div>
    )
}

export default LoginPage